import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Device} from './device.model';
import {Sensor} from './sensor.model';

@model({settings: {}})
export class Measurement extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'string',
    required: true,
  })
  timestamp: string;

  @property({
    type: 'string',
    required: true,
  })
  resource: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: false,
  })
  nativeSensorId: string;

  @property({
    type: 'object',
    required: true,
  })
  nativeNodeId: object;

  @belongsTo(() => Device)
  deviceId: string;

  @belongsTo(() => Sensor)
  sensorId: string;

  constructor(data?: Partial<Measurement>) {
    super(data);
  }
}

export interface MeasurementRelations {
  // describe navigational properties here
}

export type MeasurementWithRelations = Measurement & MeasurementRelations;
