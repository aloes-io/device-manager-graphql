import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - PresenceSensor
 * Presence sensor with digital sensing, optional delay parameters
 */
@model({name: 'PresenceSensor'})
export class PresenceSensor {
  constructor(data?: Partial<PresenceSensor>) {
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
   * Reset the Counter value.
   */
  @property()
  '5505'?: string;

  /**
   * The type of the sensor (for instance PIR type).
   */
  @property()
  '5751'?: string;

  /**
   * Delay from the detection state to the clear state in ms.
   */
  @property()
  '5903'?: number;

  /**
   * Delay from the clear state to the busy state in ms.
   */
  @property()
  '5904'?: number;
}

export interface PresenceSensorRelations {
  // describe navigational properties here
}

export type PresenceSensorWithRelations = PresenceSensor &
  PresenceSensorRelations;
