import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Actuation
 * dedicated to remote actuation such as ON/OFF action or dimming. A multi-state output can also be described as a string. This is useful to send pilot wire orders for instance. It also provides a resource to reflect the time that the device has been switched on.
 */
@model({name: 'Actuation'})
export class Actuation {
  constructor(data?: Partial<Actuation>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

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

  /**
   * This resource represents dimmer setting, which has an Integer value between 0 and 100 as a percentage.
   */
  @property()
  '5851'?: number;

  /**
   * The time in seconds that the device has been on. Writing a value of 0 resets the counter.
   */
  @property()
  '5852'?: number;

  /**
   * A string describing a state for multiple level output such as Pilot Wire.
   */
  @property()
  '5853'?: string;
}

export interface ActuationRelations {
  // describe navigational properties here
}

export type ActuationWithRelations = Actuation & ActuationRelations;
