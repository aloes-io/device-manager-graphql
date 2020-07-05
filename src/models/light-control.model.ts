import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - LightControl
 * used to control a light source, such as a LED or other light.  It allows a light to be turned on or off and its dimmer setting to be control as a % between 0 and 100. An optional colour setting enables a string to be used to indicate the desired colour.
 */
@model({name: 'LightControl'})
export class LightControl {
  constructor(data?: Partial<LightControl>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * If present, the type of sensor defined as the UCUM Unit Definition e.g. “Cel” for Temperature in Celcius.
   */
  @property()
  '5701'?: string;

  /**
   * A string representing a value in some color space
   */
  @property()
  '5706'?: string;

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

export interface LightControlRelations {
  // describe navigational properties here
}

export type LightControlWithRelations = LightControl & LightControlRelations;
