import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
  embedsOne,
} from '@loopback/repository';
import {Device} from './device.model';
import {Measurement} from './measurement.model';
import {User} from './user.model';
import {SensorResource, SensorResources} from './sensorResource.model';

@model({settings: {}})
export class Sensor extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  type: number;

  @property({
    type: 'number',
    required: true,
  })
  resource: number;

  @property({
    type: 'string',
    required: true,
  })
  devEui: string;

  @property({
    type: 'string',
    required: true,
  })
  nativeSensorId: string;

  @property({
    type: 'string',
    required: false,
  })
  nativeNodeId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nativeType: string;

  @property({
    type: 'string',
    required: true,
  })
  nativeResource: string;

  @property({
    type: 'string',
    required: false,
  })
  inPrefix?: string;

  @property({
    type: 'string',
    required: false,
  })
  outPrefix?: string;

  @property({
    type: 'string',
    required: false,
  })
  value?: string;

  @property({
    type: 'string',
    required: false,
  })
  description?: string;

  @property({
    type: 'string',
    required: false,
  })
  lastSignal?: string;

  @property({
    type: 'number',
    required: true,
  })
  frameCounter: number;

  @property({
    type: 'string',
    required: false,
  })
  transportProtocol: string;

  @property({
    type: 'string',
    required: false,
  })
  transportProtocolVersion?: string;

  @property({
    type: 'string',
    required: false,
  })
  messageProtocol: string;

  @property({
    type: 'string',
    required: false,
  })
  messageProtocolVersion?: string;

  @property({
    type: 'array',
    required: true,
    itemType: 'string',
  })
  icons: string[];

  @property({
    type: 'object',
    required: true,
  })
  colors: Colors;

  @belongsTo(() => User, {keyFrom: 'ownerId', name: 'user'})
  ownerId: string;

  @belongsTo(() => Device)
  deviceId: string;

  @hasMany(() => Measurement)
  measurements?: Measurement[];

  @embedsOne(() => SensorResource)
  resources?: SensorResources;

  constructor(data?: Partial<Sensor>) {
    super(data);
  }
}

export type Colors = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export interface SensorRelations {
  // describe navigational properties here
}

export type SensorWithRelations = Sensor & SensorRelations;

@model({settings: {}})
export class SensorTopic extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  method: string;

  @property({
    type: 'string',
    required: true,
  })
  ownerId: string;

  @property({
    type: 'string',
    required: false,
  })
  sensorId?: string;

  constructor(data?: Partial<SensorTopic>) {
    super(data);
  }
}
