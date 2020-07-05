import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - PowerControl
 * used to control a power source, such as a Smart Plug.  It allows a power relay to be turned on or off and its dimmer setting to be control as a % between 0 and 100.
 */
@model({name: 'PowerControl'})
export class PowerControl {
  constructor(data?: Partial<PowerControl>) {
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
   * The total power in Wh that the light has used.
   */
  @property()
  '5805'?: number;

  /**
   * The power factor of the actuactor.
   */
  @property()
  '5820'?: number;

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
}

export interface PowerControlRelations {
  // describe navigational properties here
}

export type PowerControlWithRelations = PowerControl & PowerControlRelations;
