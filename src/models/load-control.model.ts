import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - LoadControl
 * used for demand-response load control and other load control in automation application (not limited to power)
 */
@model({name: 'LoadControl'})
export class LoadControl {
  constructor(data?: Partial<LoadControl>) {
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
   * The event identifier as a string.
   */
  @property()
  '5823'?: string;

  /**
   * Time when the load control event will start started.
   */
  @property()
  '5824'?: number;

  /**
   * The duration of the load control event.
   */
  @property()
  '5825'?: number;

  /**
   * The criticality of the event.  The device receiving the event will react in an appropriate fashion for the device.
   */
  @property()
  '5826'?: number;

  /**
   * Defines the maximum energy usage of the receivng device, as a percentage of the device's normal maximum energy usage.
   */
  @property()
  '5827'?: string;

  /**
   * Defines the duty cycle for the load control event, i.e, what percentage of time the receiving device is allowed to be on.
   */
  @property()
  '5828'?: number;
}

export interface LoadControlRelations {
  // describe navigational properties here
}

export type LoadControlWithRelations = LoadControl & LoadControlRelations;
