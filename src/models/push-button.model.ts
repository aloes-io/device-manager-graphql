import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - PushButton
 * report the state of a momentary action push button control and to count the number of times the control has been operated since the last observation.
 */
@model({name: 'PushButton'})
export class PushButton {
  constructor(data?: Partial<PushButton>) {
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
}

export interface PushButtonRelations {
  // describe navigational properties here
}

export type PushButtonWithRelations = PushButton & PushButtonRelations;
