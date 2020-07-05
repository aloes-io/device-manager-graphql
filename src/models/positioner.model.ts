import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Positioner
 * used with a generic position actuator from 0 to 100%. This resource optionally allows setting the transition time for an operation that changes the position of the actuator, and for reading the remaining time of the currently active transition
 */
@model({name: 'Positioner'})
export class Positioner {
  constructor(data?: Partial<Positioner>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The minimum value that can be measured by the sensor.
   */
  @property()
  '5519'?: number;

  /**
   * The maximum value that can be measured by the sensor.
   */
  @property()
  '5520'?: number;

  /**
   * Current position or desired position of a positioner actuator.
   */
  @property()
  '5536'?: number;

  /**
   * The time expected to move the actuator to the new position.
   */
  @property()
  '5537'?: number;

  /**
   * The time remaining in an operation.
   */
  @property()
  '5538'?: number;

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
   * Reset the Min and Max Measured Values to Current Value.
   */
  @property()
  '5605'?: string;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;
}

export interface PositionerRelations {
  // describe navigational properties here
}

export type PositionerWithRelations = Positioner & PositionerRelations;
