import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Energy
 * report energy consumption (Cumulative Power) of an electrical load. An example measurement unit is Watt Hours (ucum:W*h)
 */
@model({name: 'Energy'})
export class Energy {
  constructor(data?: Partial<Energy>) {
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
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;

  /**
   * The total power in Wh that the light has used.
   */
  @property()
  '5805'?: number;

  /**
   * Reset both cumulative active/reactive power.
   */
  @property()
  '5822'?: string;
}

export interface EnergyRelations {
  // describe navigational properties here
}

export type EnergyWithRelations = Energy & EnergyRelations;
