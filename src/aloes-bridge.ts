/* eslint-disable @typescript-eslint/no-explicit-any */
import {ApplicationConfig} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Device, Sensor} from './models';
import {PubSubEERepository, PubSubMQTTRepository} from './repositories';
import {devicesApiEndPoint, sensorsApiEndPoint} from './services';

type Subscription = {
  topic: string;
  onMessage: (...args: any[]) => void;
  // onMessage: (payload: Device | Sensor) => void;
};

type Packet = {
  topic: string;
  payload: Device | Sensor;
};

export class AloesBridge {
  private endPoint: string;
  private subscriptions: Subscription[];

  constructor(
    options: ApplicationConfig = {},
    @repository(PubSubEERepository) protected pubsubEERepo: PubSubEERepository,
    @repository(PubSubMQTTRepository)
    protected pubsubMQTTRepo: PubSubMQTTRepository,
  ) {
    this.endPoint = options.mqtt.subPrefix;
    this.subscriptions = this.createSubscriptions();
  }

  buildTopic(payload: Device | Sensor, endpoint: string, method: string) {
    return `${payload.ownerId}/${endpoint}/${method.toUpperCase()}/${
      payload.id
    }`;
  }

  createSubscriptions(): Subscription[] {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    function bridge(packet: Packet) {
      const {topic, payload} = packet;
      self.pubsubEERepo.publish(topic, payload).catch(e => e);
    }

    const subscriptions = [
      {
        topic: `${this.endPoint}/Device/POST/#`,
        onMessage: (payload: Device) => {
          bridge({
            topic: this.buildTopic(payload, devicesApiEndPoint, 'POST'),
            payload,
          });
        },
      },
      {
        topic: `${this.endPoint}/Device/PUT/#`,
        onMessage: (payload: Device) => {
          bridge({
            topic: this.buildTopic(payload, devicesApiEndPoint, 'PUT'),
            payload,
          });
        },
      },
      {
        topic: `${this.endPoint}/Sensor/POST/#`,
        onMessage: (payload: Sensor) => {
          bridge({
            topic: this.buildTopic(payload, sensorsApiEndPoint, 'POST'),
            payload,
          });
        },
      },
      {
        topic: `${this.endPoint}/Sensor/PUT/#`,
        onMessage: (payload: Sensor) => {
          bridge({
            topic: this.buildTopic(payload, sensorsApiEndPoint, 'PUT'),
            payload,
          });
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
