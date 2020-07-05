import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - AnalogInput
 * Generic analog input for non-specific sensors
 */
@model({name: 'AnalogInput'})
export class AnalogInput {
  constructor(data?: Partial<AnalogInput>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The current value of the analog input.
   */
  @property()
  '5600'?: number;

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
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;

  /**
   * The type of the sensor (for instance PIR type).
   */
  @property()
  '5751'?: string;
}

export interface AnalogInputRelations {
  // describe navigational properties here
}

export type AnalogInputWithRelations = AnalogInput & AnalogInputRelations;
