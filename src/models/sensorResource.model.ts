/* eslint-disable @typescript-eslint/no-explicit-any */
import {Entity, model} from '@loopback/repository';

@model({settings: {}})
export class SensorResource extends Entity {
  // @property({
  //   type: 'string',
  //   required: false,
  // })
  // key?: string;

  [key: string]: any;

  constructor(data?: Partial<SensorResource>) {
    super(data);
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
