import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - AnalogOutput
 *  generic object that can be used with any kind of analog output interface.
 */
@model({name: 'AnalogOutput'})
export class AnalogOutput {
  constructor(data?: Partial<AnalogOutput>) {
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
   * The current state of the analogue output.
   */
  @property()
  '5650'?: number;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;
}

export interface AnalogOutputRelations {
  // describe navigational properties here
}

export type AnalogOutputWithRelations = AnalogOutput & AnalogOutputRelations;
