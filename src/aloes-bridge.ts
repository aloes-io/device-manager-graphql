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
  private methods = ['HEAD', 'POST', 'PUT', 'DELETE'];

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

    const sensorSubscriptions = this.methods.map(method => ({
      topic: `${this.endPoint}/Sensor/${method}/#`,
      onMessage: (payload: Sensor) => {
        bridge({
          topic: this.buildTopic(payload, sensorsApiEndPoint, method),
          payload,
        });
      },
    }));

    const deviceSubscriptions = this.methods.map(method => ({
      topic: `${this.endPoint}/Device/${method}/#`,
      onMessage: (payload: Device) => {
        bridge({
          topic: this.buildTopic(payload, devicesApiEndPoint, method),
          payload,
        });
      },
    }));

    const subscriptions = [...sensorSubscriptions, ...deviceSubscriptions];

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
