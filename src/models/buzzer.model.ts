import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Buzzer
 * actuate an audible alarm such as a buzzer, beeper, or vibration alarm. There is a dimmer control for setting the relative loudness of the alarm, and an optional duration control to limit the length of time the alarm sounds when turned on. Each time a “1” is written to the On/Off resource, the alarm will sound again for the configured duration. If no duration is programmed or the setting is zero, writing a “1” to the On/Off resource will result in the alarm sounding continuously until a “0” is written to the On/Off resource.
 */
@model({name: 'Buzzer'})
export class Buzzer {
  constructor(data?: Partial<Buzzer>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The duration of the time delay.
   */
  @property()
  '5521'?: number;

  /**
   * The off time when On/Off control remains on.
   */
  @property()
  '5525'?: number;

  /**
   * Input/output level control, float value between 0 and 100 as a percentage.
   */
  @property()
  '5548'?: number;

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

export interface BuzzerRelations {
  // describe navigational properties here
}

export type BuzzerWithRelations = Buzzer & BuzzerRelations;
