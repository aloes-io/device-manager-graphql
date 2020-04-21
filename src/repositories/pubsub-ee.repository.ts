/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable security/detect-object-injection */
import {inject} from '@loopback/core';
import {
  PubSubEngine,
  PubSubBindings,
  PubSubConfig,
  PubSubAsyncIterator,
} from 'loopback-pubsub-component';
import {EventEmitter} from 'events';
import {EventEmitter2} from 'eventEmitter2';

export class PubSubEERepository extends PubSubEngine {
  protected ee: EventEmitter | EventEmitter2;
  public subscriptions: {[subId: number]: [string, (...args: any[]) => void]};
  public subIdCounter: number;

  constructor(@inject(PubSubBindings.CONFIG) options: PubSubConfig) {
    super();
    if (options.eventEmitter) {
      this.ee = options.eventEmitter;
    } else {
      this.ee = new EventEmitter();
    }
    this.subscriptions = {};
    this.subIdCounter = 0;
  }

  public publish(triggerName: string, payload: any): Promise<void> {
    this.ee.emit(triggerName, payload);
    console.log('PubSubEERepository publish', triggerName);
    return Promise.resolve();
  }

  public subscribe(
    triggerName: string,
    onMessage: (...args: any[]) => void,
    options?: Object,
  ): Promise<number> {
    console.log('PubSubEERepository subscribe', triggerName);
    this.ee.addListener(triggerName, onMessage);
    this.subIdCounter = this.subIdCounter + 1;
    this.subscriptions[this.subIdCounter] = [triggerName, onMessage];
    return Promise.resolve(this.subIdCounter);
  }

  public unsubscribe(subIdOrTriggerName: number | string) {
    console.log('PubSubEERepository unsubscribe', subIdOrTriggerName);
    if (typeof subIdOrTriggerName === 'string') {
      return this.unsubscribeByName(subIdOrTriggerName);
    }
    return this.unsubscribeById(subIdOrTriggerName);
  }

  public asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> {
    return new PubSubAsyncIterator<T>(this, triggers);
  }

  private unsubscribeById(subId: number) {
    const [triggerName, onMessage] = this.subscriptions[subId];
    delete this.subscriptions[subId];
    this.ee.removeListener(triggerName, onMessage);
    return Promise.resolve();
  }

  private unsubscribeByName(triggerName: string) {
    const subIds: number[] = Object.keys(this.subscriptions).map(Number);
    for (const subId of subIds) {
      if (this.subscriptions[subId][0] === triggerName) {
        const onMessage = this.subscriptions[subId][1];
        delete this.subscriptions[subId];
        this.ee.removeListener(triggerName, onMessage);
        break;
      }
    }
    return Promise.resolve();
  }
}
/* eslint-enable security/detect-object-injection */
/* eslint-enable @typescript-eslint/no-explicit-any */
