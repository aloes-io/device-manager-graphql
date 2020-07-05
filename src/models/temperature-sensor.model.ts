import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - TemperatureSensor
 * used with a temperature sensor to report a temperature measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range that can be measured by the temperature sensor. An example measurement unit is degrees Celsius
 */
@model({name: 'TemperatureSensor'})
export class TemperatureSensor {
  constructor(data?: Partial<TemperatureSensor>) {
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
}

export interface TemperatureSensorRelations {
  // describe navigational properties here
}

export type TemperatureSensorWithRelations = TemperatureSensor &
  TemperatureSensorRelations;
