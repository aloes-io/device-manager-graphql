import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - DigitalInput
 * Generic digital input for non-specific sensors
 */
@model({name: 'DigitalInput'})
export class DigitalInput {
  constructor(data?: Partial<DigitalInput>) {
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
   * The polarity of the digital input as a Boolean (0 = Normal, 1= Reversed).
   */
  @property()
  '5502'?: boolean;

  /**
   * The debounce period in ms.
   */
  @property()
  '5503'?: number;

  /**
   * The edge selection as an integer (1 = Falling edge, 2 = Rising edge, 3 = Both Rising and Falling edge).
   */
  @property()
  '5504'?: number;

  /**
   * Reset the Counter value.
   */
  @property()
  '5505'?: string;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;

  /**
   * The type of the sensor (for instance PIR type).
   */
  @property()
  '5751'?: string;
}

export interface DigitalInputRelations {
  // describe navigational properties here
}

export type DigitalInputWithRelations = DigitalInput & DigitalInputRelations;
