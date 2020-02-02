import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {User} from './user.model';
import {Sensor} from './sensor.model';

@model({settings: {}})
export class Device extends Entity {
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
    type: 'string',
    required: true,
  })
  devEui: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: false,
  })
  clientKey?: string;

  @property({
    type: 'string',
    required: true,
  })
  apiKey: string;

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
    required: true,
  })
  transportProtocol: string;

  @property({
    type: 'string',
    required: false,
  })
  transportProtocolVersion?: string;

  @property({
    type: 'string',
    required: true,
  })
  messageProtocol: string;

  @property({
    type: 'string',
    required: false,
  })
  messageProtocolVersion?: string;

  @property({
    type: 'string',
    required: false,
  })
  accessPointUrl?: string;

  @property({
    type: 'string',
    required: false,
  })
  qrCode?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'string',
    required: false,
  })
  createdAt?: string;

  @belongsTo(() => User, {keyFrom: 'ownerId', name: 'user'})
  ownerId: string;

  @hasMany(() => Sensor)
  sensors?: Sensor[];

  constructor(data?: Partial<Device>) {
    super(data);
  }
}

export interface DeviceRelations {
  // describe navigational properties here
}

export type DeviceWithRelations = Device & DeviceRelations;

@model({settings: {}})
export class DeviceAuthResponse extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  key: string;

  @property({
    // type: 'object',
    schema: {'x-ts-type': Device},
    required: true,
  })
  device: Device;
}

@model({settings: {}})
export class DeviceCredential extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  apiKey: string;

  @property({
    type: 'string',
    required: true,
  })
  devEui: string;

  constructor(data?: Partial<DeviceCredential>) {
    super(data);
  }
}
