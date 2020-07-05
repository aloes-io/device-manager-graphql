import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - OnOffSwitch
 * used with an On/Off switch to report the state of the switch.
 */
@model({name: 'OnOffSwitch'})
export class OnOffSwitch {
  constructor(data?: Partial<OnOffSwitch>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The current state of a digital input.
   */
  @property()
  '5500'?: boolean;

  /**
   * The cumulative value of active state detected.
   */
  @property()
  '5501'?: number;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;

  /**
   * The time in seconds that the device has been on. Writing a value of 0 resets the counter.
   */
  @property()
  '5852'?: number;

  /**
   * The time in seconds since the Off command was sent. Writing a value of 0 resets the counter.
   */
  @property()
  '5854'?: number;
}

export interface OnOffSwitchRelations {
  // describe navigational properties here
}

export type OnOffSwitchWithRelations = OnOffSwitch & OnOffSwitchRelations;
