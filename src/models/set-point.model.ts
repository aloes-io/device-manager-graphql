import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - SetPoint
 * used to set a desired value to a controller, such as a thermostat. This object enables a setpoint to be expressed units defined in the UCUM specification, to match an associated sensor or measurement value. A special resource is added to set the colour of an object
 */
@model({name: 'SetPoint'})
export class SetPoint {
  constructor(data?: Partial<SetPoint>) {
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

  /**
   * The setpoint value.
   */
  @property()
  '5900'?: number;
}

export interface SetPointRelations {
  // describe navigational properties here
}

export type SetPointWithRelations = SetPoint & SetPointRelations;
