/* eslint-disable @typescript-eslint/no-explicit-any */
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {Device, Sensor} from './models';
import {PubSubEERepository, PubSubMQTTRepository} from './repositories';
import {devicesApiEndPoint, sensorsApiEndPoint} from './services';

type Subscription = {
  topic: string;
  onMessage: (...args: any[]) => void;
  // onMessage: Function;
};

export class AloesBridge {
  private endPoint = `aloes-${process.env.ALOES_ID}/+/tx/+`;
  private subscriptions: Subscription[];

  constructor(
    @repository(PubSubEERepository) protected pubsubEERepo: PubSubEERepository,
    @repository(PubSubMQTTRepository)
    protected pubsubMQTTRepo: PubSubMQTTRepository,
  ) {
    this.subscriptions = this.createSubscriptions();
  }

  createSubscriptions(): Subscription[] {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    function bridge(topic: string, payload: Device | Sensor) {
      self.pubsubEERepo.publish(topic, payload).catch(e => e);
    }

    const subscriptions = [
      {
        topic: `${this.endPoint}/Device/POST/#`,
        onMessage: (payload: Device) => {
          bridge(
            `${payload.ownerId}/${devicesApiEndPoint}/post/${payload.id}`,
            payload,
          );
        },
      },
      {
        topic: `${this.endPoint}/Device/PUT/#`,
        onMessage: (payload: Device) => {
          bridge(
            `${payload.ownerId}/${devicesApiEndPoint}/put/${payload.id}`,
            payload,
          );
        },
      },
      {
        topic: `${this.endPoint}/Sensor/POST/#`,
        onMessage: (payload: Sensor) => {
          bridge(
            `${payload.ownerId}/${sensorsApiEndPoint}/post/${payload.id}`,
            payload,
          );
        },
      },
      {
        topic: `${this.endPoint}/Sensor/PUT/#`,
        onMessage: (payload: Sensor) => {
          bridge(
            `${payload.ownerId}/${sensorsApiEndPoint}/put/${payload.id}`,
            payload,
          );
        },
      },
    ];

    return subscriptions;
  }

  async start(): Promise<void> {
    try {
      const promises = this.subscriptions.map(async sub =>
        this.pubsubMQTTRepo.subscribe(sub.topic, sub.onMessage),
      );
      await Promise.all(promises);
      console.log('Start Aloes bridge', 'done');
    } catch (error) {
      console.error('Start Aloes bridge', error);
    }
  }

  async stop(): Promise<void> {
    const promises = this.subscriptions.map(async sub =>
      this.pubsubMQTTRepo.unsubscribe(sub.topic),
    );
    await Promise.all(promises);
    console.log('Stop Aloes bridge', 'done');
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */
