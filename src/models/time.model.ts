import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Time
 * report the current time in seconds since January 1, 1970 UTC. There is also a fractional time counter that has a range of less than one second.
 */
@model({name: 'Time'})
export class Time {
  constructor(data?: Partial<Time>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * Unix Time. A signed integer representing the number of seconds since Jan 1st, 1970 in the UTC time zone.
   */
  @property()
  '5506'?: string;

  /**
   * For shorter times of a fraction of a second (i.e. 0.23).
   */
  @property()
  '5507'?: number;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;
}

export interface TimeRelations {
  // describe navigational properties here
}

export type TimeWithRelations = Time & TimeRelations;
