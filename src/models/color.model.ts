import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Color
 * report the measured value of a colour sensor in some colour space described by the units resource.
 */
@model({name: 'Color'})
export class Color {
  constructor(data?: Partial<Color>) {
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
}

export interface ColorRelations {
  // describe navigational properties here
}

export type ColorWithRelations = Color & ColorRelations;
