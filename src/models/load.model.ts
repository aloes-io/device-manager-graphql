import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Load
 *  used with a load sensor (as in a scale) to report the applied weight or force. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is kilograms
 */
@model({name: 'Load'})
export class Load {
  constructor(data?: Partial<Load>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The minimum value that can be measured by the sensor
   */
  @property()
  '5601'?: number;

  /**
   * The maximum value that can be measured by the sensor.
   */
  @property()
  '5602'?: number;

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
   * Last or Current Measured Value from the Sensor.
   */
  @property()
  '5700'?: number;

  /**
   * If present, the type of sensor defined as the UCUM Unit Definition e.g. “Cel” for Temperature in Celcius.
   */
  @property()
  '5701'?: string;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;

  /**
   * Read or Write the current calibration coefficient.
   */
  @property()
  '5821'?: number;
}

export interface LoadRelations {
  // describe navigational properties here
}

export type LoadWithRelations = Load & LoadRelations;