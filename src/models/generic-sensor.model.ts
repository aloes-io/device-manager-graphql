import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - GenericSensor
 * It is based on the description of a value and a unit according to the UCUM specification. Thus, any type of value defined within this specification can be reporting using this object. Specific object for a given range of sensors is described later in the document, enabling to identify the type of sensors directly from its Object ID. This object may be used as a generic object if a dedicated one does not exist.
 */
@model({name: 'GenericSensor'})
export class GenericSensor {
  constructor(data?: Partial<GenericSensor>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The minimum value that can be measured by the sensor
   */
  @property()
  '5601'?: number;

  /**
   * The maximum value that can be measured by the sensor.
   */
  @property()
  '5602'?: number;

  /**
   * The minimum value that can be measured by the sensor.
   */
  @property()
  '5603'?: number;

  /**
   * The maximum value that can be measured by the sensor.
   */
  @property()
  '5604'?: number;

  /**
   * Reset the Min and Max Measured Values to Current Value.
   */
  @property()
  '5605'?: string;

  /**
   * Last or Current Measured Value from the Sensor.
   */
  @property()
  '5700'?: number;

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
   * The type of the sensor (for instance PIR type).
   */
  @property()
  '5751'?: string;
}

export interface GenericSensorRelations {
  // describe navigational properties here
}

export type GenericSensorWithRelations = GenericSensor & GenericSensorRelations;
