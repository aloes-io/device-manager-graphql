import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - DigitalOutput
 * Generic digital output for non-specific actuators
 */
@model({name: 'DigitalOutput'})
export class DigitalOutput {
  constructor(data?: Partial<DigitalOutput>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The current state of a digital output,  0=OFF, 1=ON..
   */
  @property()
  '5550'?: boolean;

  /**
   * The polarity of a digital ouput as a Boolean (0 = Normal, 1= Reversed).
   */
  @property()
  '5551'?: boolean;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;
}

export interface DigitalOutputRelations {
  // describe navigational properties here
}

export type DigitalOutputWithRelations = DigitalOutput & DigitalOutputRelations;
