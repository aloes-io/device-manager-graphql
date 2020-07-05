import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Stopwatch
 * An ascending timer that counts how long time has passed since the timer was started after reset.
 */
@model({name: 'Stopwatch'})
export class Stopwatch {
  constructor(data?: Partial<Stopwatch>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The cumulative value of active state detected.
   */
  @property()
  '5501'?: number;

  /**
   * The total time in seconds that the timer input is true. Writing a 0 resets the time.
   */
  @property()
  '5544'?: number;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;

  /**
   * This resource represents a power source, which can be controlled, the setting of which is a Boolean value (1,0) where 1 is on and 0 is off
   */
  @property()
  '5850'?: boolean;
}

export interface StopwatchRelations {
  // describe navigational properties here
}

export type StopwatchWithRelations = Stopwatch & StopwatchRelations;
