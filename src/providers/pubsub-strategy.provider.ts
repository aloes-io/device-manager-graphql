/* eslint-disable @typescript-eslint/no-explicit-any */
import {inject, Provider, ValueOrPromise} from '@loopback/core';
import {Request, Response} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {
  PubSubBindings,
  PubSubConfig,
  PubSubStrategy,
  PubSubMetadata,
  CallbackObject,
} from 'loopback-pubsub-component';
import {PubSubRepository} from '../repositories';

export class PubSubStrategyProvider
  implements Provider<PubSubStrategy | undefined> {
  constructor(
    @inject(PubSubBindings.METADATA) private metadata: PubSubMetadata,
    @repository(PubSubRepository) protected pubsubRepo: PubSubRepository,
  ) {}

  value(): ValueOrPromise<PubSubStrategy | undefined> {
    // console.log('PUBSUB STRATEGY', this.pubsubRepo);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return {
      setConfig: async (config?: Object) => {
        const pubsubConf: PubSubConfig = {};
        return pubsubConf;
      },

      checkCallback: async (
        request: Request,
        response: Response,
        options?: Object,
      ) => {
        // todo : find schema from the request and response
        console.log('CHECK CALLBACK', this.metadata, request.path);
        if (!this.metadata) {
          return Promise.resolve(undefined);
        }
        // if (request.path === this.metadata.path) {
        // }

        const callbackObject: CallbackObject = {
          path: this.metadata.path,
          method: this.metadata.method,
        };
        return Promise.resolve(callbackObject);
      },

      publish: async (triggerName: string, payload: any) => {
        await this.pubsubRepo.publish(triggerName, JSON.stringify(payload));
      },

      subscribe: (
        triggerName: string,
        onMessage: (...args: any[]) => void,
        options?: Object,
      ) => {
        return this.pubsubRepo.subscribe(triggerName, onMessage, options);
      },

      unsubscribe: async (subscriptionId: number) => {
        await this.pubsubRepo.unsubscribe(subscriptionId);
      },

      asyncIterator(triggers: string | string[]) {
        return self.pubsubRepo.asyncIterator(triggers);
      },

      // asyncIterator<T>(triggers: string | string[]) {
      //   return new PubSubAsyncIterator<T>(self.pubsubRepo, triggers);
      // },
    };
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
