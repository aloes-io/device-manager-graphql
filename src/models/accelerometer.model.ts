import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Accelerometer
 * can be used to represent a 1-3 axis accelerometer.
 */
@model({name: 'Accelerometer'})
export class Accelerometer {
  constructor(data?: Partial<Accelerometer>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The minimum value that can be measured by the sensor.
   */
  @property()
  '5603'?: number;

  /**
   * The maximum value that can be measured by the sensor.
   */
  @property()
  '5604'?: number;

  /**
   * If present, the type of sensor defined as the UCUM Unit Definition e.g. “Cel” for Temperature in Celcius.
   */
  @property()
  '5701'?: string;

  /**
   * The measured value along the X axis.
   */
  @property()
  '5702'?: number;

  /**
   * The measured value along the Y axis.
   */
  @property()
  '5703'?: number;

  /**
   * The measured value along the Z axis.
   */
  @property()
  '5704'?: number;
}

export interface AccelerometerRelations {
  // describe navigational properties here
}

export type AccelerometerWithRelations = Accelerometer & AccelerometerRelations;
