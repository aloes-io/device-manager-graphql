/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Bitmap
 * Summarize several digital inputs to one value by mapping each bit to a digital input.
 */
@model({name: 'Bitmap'})
export class Bitmap {
  constructor(data?: Partial<Bitmap>) {
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
   * Integer in which each of the bits are associated with specific digital input value. Represented as a binary signed integer in network byte order, and in two's complement representation. Using values in range 0-127 is recommended to avoid ambiguities with byte order and negative values.
   */
  @property()
  '5910'?: any;
  // '5910'?: number ;

  /**
   * Reset the Bitmap Input value.
   */
  @property()
  '5911'?: string;

  /**
   * The description of each bit as a string. First instance describes the least significant bit, second instance the second least significant bit.
   */
  @property()
  '5912'?: string;
}

export interface BitmapRelations {
  // describe navigational properties here
}

export type BitmapWithRelations = Bitmap & BitmapRelations;
