/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable security/detect-object-injection */

import {inject} from '@loopback/core';
import {
  PubSubEngine,
  PubSubBindings,
  PubSubConfig,
  PubSubAsyncIterator,
} from 'loopback-pubsub-component';
import {
  connect,
  Client,
  ISubscriptionGrant,
  IClientPublishOptions,
  IClientSubscribeOptions,
} from 'mqtt';

export interface PubSubMQTTOptions extends PubSubConfig {
  brokerUrl?: string;
  client?: Client;
  connectionListener?: (err: Error) => void;
  publishOptions?: PublishOptionsResolver;
  subscribeOptions?: SubscribeOptionsResolver;
  onMQTTSubscribe?: (id: number, granted: ISubscriptionGrant[]) => void;
  triggerTransform?: TriggerTransform;
  // parseMessageWithEncoding?: string;
  parseMessageWithEncoding?:
    | 'ascii'
    | 'utf8'
    | 'utf-8'
    | 'utf16le'
    | 'ucs2'
    | 'ucs-2'
    | 'base64'
    | 'latin1'
    | 'binary'
    | 'hex'
    | undefined;
}

export class PubSubMQTTRepository extends PubSubEngine {
  protected client: Client;
  public subscriptions: {[subId: number]: [string, (...args: any[]) => void]};
  private subsRefsMap: {[trigger: string]: Array<number>};
  public subIdCounter: number;
  private currentSubscriptionId: number;
  private triggerTransform: TriggerTransform;
  private onMQTTSubscribe: SubscribeHandler;
  private subscribeOptionsResolver: SubscribeOptionsResolver;
  private publishOptionsResolver: PublishOptionsResolver;
  // private parseMessageWithEncoding?: string;
  private parseMessageWithEncoding?:
    | 'ascii'
    | 'utf8'
    | 'utf-8'
    | 'utf16le'
    | 'ucs2'
    | 'ucs-2'
    | 'base64'
    | 'latin1'
    | 'binary'
    | 'hex'
    | undefined;

  private static matches(pattern: string, topic: string) {
    const patternSegments = pattern.split('/');
    const topicSegments = topic.split('/');
    const patternLength = patternSegments.length;

    for (let i = 0; i < patternLength; i++) {
      const currentPattern = patternSegments[i];
      const currentTopic = topicSegments[i];
      if (!currentTopic && !currentPattern) {
        continue;
      }
      if (!currentTopic && currentPattern !== '#') {
        return false;
      }
      if (currentPattern[0] === '#') {
        return i === patternLength - 1;
      }
      if (currentPattern[0] !== '+' && currentPattern !== currentTopic) {
        return false;
      }
    }
    return patternLength === topicSegments.length;
  }

  constructor(@inject(PubSubBindings.CONFIG) options: PubSubMQTTOptions) {
    super();
    this.subscriptions = {};
    this.subsRefsMap = {};
    this.subIdCounter = 0;
    this.currentSubscriptionId = 0;

    this.triggerTransform =
      options.triggerTransform ?? (trigger => trigger as string);

    if (options.client) {
      this.client = options.client;
    } else {
      const brokerUrl = options.brokerUrl ?? 'mqtt://localhost';
      this.client = connect(brokerUrl);
    }

    this.client.on('message', this.onMessage.bind(this));

    if (options.connectionListener) {
      this.client.on('connect', options.connectionListener);
      this.client.on('error', options.connectionListener);
    } else {
      this.client.on('error', console.error);
    }

    this.onMQTTSubscribe = options.onMQTTSubscribe ?? (() => null);
    this.publishOptionsResolver =
      options.publishOptions ??
      (() => Promise.resolve({} as IClientPublishOptions));
    this.subscribeOptionsResolver =
      options.subscribeOptions ??
      (() => Promise.resolve({} as IClientSubscribeOptions));
    this.parseMessageWithEncoding = options.parseMessageWithEncoding;
  }

  public publish(triggerName: string, payload: any): Promise<void> {
    return this.publishOptionsResolver(triggerName, payload).then(
      publishOptions => {
        payload = JSON.stringify(payload);
        const message = Buffer.from(payload, this.parseMessageWithEncoding);
        // console.log('PubSubMQTTRepository publish', triggerName);
        this.client.publish(triggerName, message, publishOptions);
      },
    );
    // return true;
  }

  public subscribe(
    trigger: string,
    onMessage: (...args: any[]) => void,
    options?: Object,
  ): Promise<number> {
    const triggerName: string = this.triggerTransform(trigger, options);
    // console.log('PubSubMQTTRepository subscribe', triggerName);

    const id = this.currentSubscriptionId++;
    this.subscriptions[id] = [triggerName, onMessage];

    const refs = this.subsRefsMap[triggerName];
    if (refs && refs.length > 0) {
      const newRefs = [...refs, id];
      this.subsRefsMap[triggerName] = newRefs;
      return Promise.resolve(id);
    }
    return new Promise<number>((resolve, reject) => {
      this.subscribeOptionsResolver(trigger, options)
        .then(subscriptionOptions => {
          this.client.subscribe(
            triggerName,
            {qos: 0, ...subscriptionOptions},
            (err, granted) => {
              if (err) {
                reject(err);
              } else {
                const subscriptionIds = this.subsRefsMap[triggerName] || [];
                this.subsRefsMap[triggerName] = [...subscriptionIds, id];
                resolve(id);

                this.onMQTTSubscribe(id, granted);
              }
            },
          );
        })
        .catch(err => reject(err));
    });
  }

  public unsubscribe(subIdOrTriggerName: number | string) {
    if (typeof subIdOrTriggerName === 'string') {
      return this.unsubscribeByName(subIdOrTriggerName);
    }
    return this.unsubscribeById(subIdOrTriggerName);
  }

  public asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> {
    return new PubSubAsyncIterator<T>(this, triggers);
  }

  private onMessage(topic: string, message: Buffer) {
    const subsRefsKeys = Object.keys(this.subsRefsMap).filter(key =>
      PubSubMQTTRepository.matches(key, topic),
    );
    let subscribers: number[] = [];
    subsRefsKeys.forEach(refKey => {
      subscribers = [...subscribers, ...this.subsRefsMap[refKey]];
    });

    if (!subscribers || !subscribers.length) {
      return;
    }
    const messageString = message.toString(this.parseMessageWithEncoding);
    let parsedMessage;
    try {
      parsedMessage = JSON.parse(messageString);
    } catch (e) {
      parsedMessage = messageString;
    }

    for (const subId of subscribers) {
      const listener = this.subscriptions[subId][1];
      listener(parsedMessage);
    }
  }

  private unsubscribeById(subId: number) {
    const [triggerName] = this.subscriptions[subId] || [];
    const refs = this.subsRefsMap[triggerName];
    if (!refs) {
      throw new Error(`There is no subscription of id "${subId}"`);
    }

    let newRefs: number[] = [];
    if (refs.length === 1) {
      this.client.unsubscribe(triggerName);
      newRefs = [];
    } else {
      const index = refs.indexOf(subId);
      if (index > -1) {
        newRefs = [...refs.slice(0, index), ...refs.slice(index + 1)];
      }
    }

    this.subsRefsMap[triggerName] = newRefs;
    delete this.subscriptions[subId];
    return Promise.resolve();
  }

  private unsubscribeByName(triggerName: string) {
    const refs = this.subsRefsMap[triggerName];
    if (!refs) {
      throw new Error(`There is no subscription of path "${triggerName}"`);
    }

    let subscriptionId: number;
    const subIds = Object.keys(this.subscriptions).map(Number);
    for (const subId of subIds) {
      if (this.subscriptions[subId][0] === triggerName) {
        // const onMessage = this.subscriptions[subId][1];
        subscriptionId = Number(subId);
        let newRefs: number[] = [];
        if (refs.length === 1) {
          this.client.unsubscribe(triggerName);
          newRefs = [];
        } else {
          const index = refs.indexOf(subscriptionId);
          if (index > -1) {
            newRefs = [...refs.slice(0, index), ...refs.slice(index + 1)];
          }
        }
        this.subsRefsMap[triggerName] = newRefs;
        delete this.subscriptions[subscriptionId];
        break;
      }
    }

    return Promise.resolve();
  }
}

export type Path = Array<string | number>;
export type Trigger = string | Path;
export type TriggerTransform = (
  trigger: Trigger,
  channelOptions?: Object,
) => string;

export type SubscribeOptionsResolver = (
  trigger: Trigger,
  channelOptions?: Object,
) => Promise<IClientSubscribeOptions>;

export type PublishOptionsResolver = (
  trigger: Trigger,
  payload: any,
) => Promise<IClientPublishOptions>;

export type SubscribeHandler = (
  id: number,
  granted: ISubscriptionGrant[],
) => void;

/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable security/detect-object-injection */
