import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - LevelControl
 * used with a dimmer or level control to report the state of the control.
 */
@model({name: 'LevelControl'})
export class LevelControl {
  constructor(data?: Partial<LevelControl>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

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

export interface LevelControlRelations {
  // describe navigational properties here
}

export type LevelControlWithRelations = LevelControl & LevelControlRelations;
