/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Magnetometer
 * used to represent a 1-3 axis magnetometer with optional compass direction.
 */
@model({name: 'Magnetometer'})
export class Magnetometer {
  constructor(data?: Partial<Magnetometer>) {
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
   * The compass direction.
   */
  @property()
  '5705'?: number | any;
}

export interface MagnetometerRelations {
  // describe navigational properties here
}

export type MagnetometerWithRelations = Magnetometer & MagnetometerRelations;
