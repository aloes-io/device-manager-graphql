/* eslint-disable @typescript-eslint/no-explicit-any */
import {inject} from '@loopback/core';
import {PubSubEngine, PubSubAsyncIterator} from 'loopback-pubsub-component';
import {EventEmitter} from 'events';
// import {connect, Client} from 'mqtt';

export interface PubSubOptions {
  eventEmitter?: EventEmitter;
}

export class PubSubRepository extends PubSubEngine {
  protected ee: EventEmitter;
  public subscriptions: {[key: string]: [string, (...args: any[]) => void]};
  public subIdCounter: number;
  //   client: Client

  // const mqttClient = connect(options.mqtt.url, {
  //   ...options.mqtt.options,
  // });

  constructor(options: PubSubOptions = {}) {
    super();
    this.ee = options.eventEmitter ?? new EventEmitter();
    this.subscriptions = {};
    this.subIdCounter = 0;
    // client: mqttClient
  }

  public publish(triggerName: string, payload: any): Promise<void> {
    this.ee.emit(triggerName, payload);
    console.log('PubSubRepository publish', triggerName, payload);
    return Promise.resolve();
  }

  public subscribe(
    triggerName: string,
    onMessage: (...args: any[]) => void,
    options?: Object,
  ): Promise<number> {
    console.log('PubSubRepository subscribe', triggerName);
    this.ee.addListener(triggerName, onMessage);
    this.subIdCounter = this.subIdCounter + 1;
    this.subscriptions[this.subIdCounter] = [triggerName, onMessage];
    return Promise.resolve(this.subIdCounter);
  }

  public unsubscribe(subId: number) {
    /* eslint-disable security/detect-object-injection */
    const [triggerName, onMessage] = this.subscriptions[subId];
    delete this.subscriptions[subId];
    /* eslint-enable security/detect-object-injection */
    this.ee.removeListener(triggerName, onMessage);
    return Promise.resolve();
  }

  public asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> {
    return new PubSubAsyncIterator<T>(this, triggers);
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */
