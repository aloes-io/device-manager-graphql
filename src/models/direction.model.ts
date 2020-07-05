/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Direction
 * report the direction indicated by a compass, wind vane, or other directional indicator. The units of measure is plane angle degrees
 */
@model({name: 'Direction'})
export class Direction {
  constructor(data?: Partial<Direction>) {
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
   * Reset the Min and Max Measured Values to Current Value.
   */
  @property()
  '5605'?: string;

  /**
   * The compass direction.
   */
  @property()
  '5705'?: number | any;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;
}

export interface DirectionRelations {
  // describe navigational properties here
}

export type DirectionWithRelations = Direction & DirectionRelations;
