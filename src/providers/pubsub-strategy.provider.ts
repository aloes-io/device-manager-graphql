/* eslint-disable @typescript-eslint/no-explicit-any */
import {inject, Provider, ValueOrPromise} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  PubSubBindings,
  PubSubConfig,
  PubSubStrategy,
  PubSubMetadata,
} from 'loopback-pubsub-component';
import {PubSubEERepository, PubSubMQTTRepository} from '../repositories';

export class PubSubStrategyProvider
  implements Provider<PubSubStrategy | undefined> {
  private engines: (PubSubEERepository | PubSubMQTTRepository)[];

  constructor(
    @inject(PubSubBindings.METADATA) private metadata: PubSubMetadata,
    @repository(PubSubEERepository) protected pubsubEERepo: PubSubEERepository,
    @repository(PubSubMQTTRepository)
    protected pubsubMQTTRepo: PubSubMQTTRepository,
  ) {
    this.engines = [this.pubsubEERepo, this.pubsubMQTTRepo];
  }

  selectRepository(
    triggerNames: string | string[],
  ): PubSubEERepository | PubSubMQTTRepository {
    // check triggerName or triggerNames[0]
    // return this.pubsubEERepo || this.pubsubMQTTRepo;
    return this.engines[0];
  }

  value(): ValueOrPromise<PubSubStrategy | undefined> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return {
      setConfig: async (config?: Object) => {
        const pubsubConf: PubSubConfig = {};
        return pubsubConf;
      },

      publish: async (triggerName: string, payload: any) => {
        const engine = this.selectRepository(triggerName);
        await engine.publish(triggerName, JSON.stringify(payload));
      },

      subscribe: (
        triggerName: string,
        onMessage: (...args: any[]) => void,
        options?: Object,
      ) => {
        const engine = this.selectRepository(triggerName);
        return engine.subscribe(triggerName, onMessage, options);
      },

      unsubscribe: async (triggerName: string) => {
        const engine = this.selectRepository(triggerName);
        await engine.unsubscribe(triggerName);
      },

      asyncIterator(triggers: string | string[]) {
        const engine = self.selectRepository(triggers);
        return engine.asyncIterator(triggers);
      },
    };
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
