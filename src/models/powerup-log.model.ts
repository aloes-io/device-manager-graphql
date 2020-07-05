import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - PowerupLog
 * An ascending timer that counts how long time has passed since the timer was started after reset.
 */
@model({name: 'PowerupLog'})
export class PowerupLog {
  constructor(data?: Partial<PowerupLog>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The tool version that the device supports - used to determine the logging object/resource version to be used for parsing
   */
  @property()
  '1'?: string;

  /**
   * IMEI of device
   */
  @property()
  '2'?: string;

  /**
   * IMSI of device
   */
  @property()
  '3'?: string;

  /**
   * MSISDN of device
   */
  @property()
  '4'?: string;

  /**
   * Human-readable name of the device
   */
  @property()
  '10'?: string;
}

export interface PowerupLogRelations {
  // describe navigational properties here
}

export type PowerupLogWithRelations = PowerupLog & PowerupLogRelations;
