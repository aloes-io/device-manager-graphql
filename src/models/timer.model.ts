import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Timer
 * used to time events and actions, using patterns common to industrial timers. A POST to the trigger resource or On/Off input state change starts the timing operation, and the timer remaining time shows zero when the operation is complete. The patterns supported are One-Shot (mode 1), On-Time or Interval (mode 2), Time delay on pick-up or TDPU (tmode 3), and Time Delay on Drop-Out or TDDO (mode 4). Mode 0 disables the timer, so the output follows the input with no delay. A counter is provided to count occurrences of the timer output changing from 0 to 1. Writing a value of zero resets the counter. The Digital Input State resource reports the state of the timer output
 */
@model({name: 'Timer'})
export class Timer {
  constructor(data?: Partial<Timer>) {
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
   * The duration of the time delay.
   */
  @property()
  '5521'?: number;

  /**
   * Trigger initiating actuation.
   */
  @property()
  '5523'?: string;

  /**
   * The off time when On/Off control remains on.
   */
  @property()
  '5525'?: number;

  /**
   * type of timer pattern used by the patterns.
   */
  @property()
  '5526'?: number;

  /**
   * Counts the number of times the timer output transitions from 0 to 1.
   */
  @property()
  '5534'?: number;

  /**
   * The time remaining in an operation.
   */
  @property()
  '5538'?: number;

  /**
   * The current state of the timer output.
   */
  @property()
  '5543'?: boolean;

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

export interface TimerRelations {
  // describe navigational properties here
}

export type TimerWithRelations = Timer & TimerRelations;
