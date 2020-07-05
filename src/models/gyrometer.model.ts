import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Gyrometer
 * report the current reading of a gyrometer sensor in 3 axes. It provides tracking of the minimum and maximum angular rate in all 3 axes. An example unit of measure is radians per second (ucum:rad/s)
 */
@model({name: 'Gyrometer'})
export class Gyrometer {
  constructor(data?: Partial<Gyrometer>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The minimum measured value along the X axis.
   */
  @property()
  '5508'?: number;

  /**
   * The maximum measured value along the X axis.
   */
  @property()
  '5509'?: number;

  /**
   * The minimum measured value along the Y axis.
   */
  @property()
  '5510'?: number;

  /**
   * The maximum measured value along the Y axis.
   */
  @property()
  '5511'?: number;

  /**
   * The minimum measured value along the Z axis.
   */
  @property()
  '5512'?: number;

  /**
   * The maximum measured value along the Z axis.
   */
  @property()
  '5513'?: number;

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
   * Reset the Min and Max Measured Values to Current Value.
   */
  @property()
  '5605'?: string;

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

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;
}

export interface GyrometerRelations {
  // describe navigational properties here
}

export type GyrometerWithRelations = Gyrometer & GyrometerRelations;
