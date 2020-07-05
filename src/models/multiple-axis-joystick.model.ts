import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - MultipleAxisJoystick
 * report the position of a shuttle or joystick control. A digital input is provided to report the state of an associated push button.
 */
@model({name: 'MultipleAxisJoystick'})
export class MultipleAxisJoystick {
  constructor(data?: Partial<MultipleAxisJoystick>) {
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
   * The measured value along the X axis.
   */
  @property()
  '5702'?: number;

  /**
   * The measured value along the Y axis.
   */
  @property()
  '5703'?: number;

  /**
   * The measured value along the Z axis.
   */
  @property()
  '5704'?: number;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;
}

export interface MultipleAxisJoystickRelations {
  // describe navigational properties here
}

export type MultipleAxisJoystickWithRelations = MultipleAxisJoystick &
  MultipleAxisJoystickRelations;
