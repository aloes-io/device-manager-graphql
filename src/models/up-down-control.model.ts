import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - UpDownControl
 * used to report the state of an up/down control element like a pair of push buttons or a rotary encoder. Counters for increase and decrease operations are provided for counting pulses from a quadrature encoder
 */
@model({name: 'UpDownControl'})
export class UpDownControl {
  constructor(data?: Partial<UpDownControl>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * Indicates an increase control action.
   */
  @property()
  '5532'?: boolean;

  /**
   * Indicates an decrease control action.
   */
  @property()
  '5533'?: boolean;

  /**
   * Counts the number of times the increase control has been operated. Writing a 0 resets the counter.
   */
  @property()
  '5541'?: number;

  /**
   * Counts the times the decrease control has been operated. Writing a 0 resets the counter
   */
  @property()
  '5542'?: number;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;
}

export interface UpDownControlRelations {
  // describe navigational properties here
}

export type UpDownControlWithRelations = UpDownControl & UpDownControlRelations;
