import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - PowerMeasurment
 * used over a power measurement sensor to report a remote power measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range for both active and reactive power. Il also provides resources for cumulative energy, calibration, and the power factor.
 */
@model({name: 'PowerMeasurment'})
export class PowerMeasurment {
  constructor(data?: Partial<PowerMeasurment>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * Reset the Min and Max Measured Values to Current Value.
   */
  @property()
  '5605'?: string;

  /**
   * The current active power.
   */
  @property()
  '5800'?: number;

  /**
   * The minimum active power measured by the sensor since it is ON.
   */
  @property()
  '5801'?: number;

  /**
   * The maximum active power measured by the sensor since it is ON.
   */
  @property()
  '5802'?: number;

  /**
   * The minimum active power that can be measured by the sensor.
   */
  @property()
  '5803'?: number;

  /**
   * The maximum active power that can be measured by the sensor.
   */
  @property()
  '5804'?: number;

  /**
   * The total power in Wh that the light has used.
   */
  @property()
  '5805'?: number;

  /**
   * Request an active power calibration by writing the value of a calibrated load.
   */
  @property()
  '5806'?: number;

  /**
   * The current reactive power.
   */
  @property()
  '5810'?: number;

  /**
   * The minimum reactive power measured by the sensor since it is ON.
   */
  @property()
  '5811'?: number;

  /**
   * The maximum reactive power measured by the sensor since it is ON.
   */
  @property()
  '5812'?: number;

  /**
   * The minimum active power that can be measured by the sensor.
   */
  @property()
  '5813'?: number;

  /**
   * The minimum active power that can be measured by the sensor.
   */
  @property()
  '5814'?: number;

  /**
   * The cumulative reactive power since the last cumulative energy reset or device start.
   */
  @property()
  '5815'?: number;

  /**
   * Request a reactive power calibration by writing the value of a calibrated load.
   */
  @property()
  '5816'?: number;

  /**
   * The power factor of the actuactor.
   */
  @property()
  '5820'?: number;

  /**
   * Read or Write the current calibration coefficient.
   */
  @property()
  '5821'?: number;

  /**
   * Reset both cumulative active/reactive power.
   */
  @property()
  '5822'?: string;
}

export interface PowerMeasurmentRelations {
  // describe navigational properties here
}

export type PowerMeasurmentWithRelations = PowerMeasurment &
  PowerMeasurmentRelations;
