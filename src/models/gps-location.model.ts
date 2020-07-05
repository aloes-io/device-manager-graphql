/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - GpsLocation
 * represents GPS coordinates. This object is compatible with the LWM2M management object for location, but uses reusable resources.
 */
@model({name: 'GpsLocation'})
export class GpsLocation {
  constructor(data?: Partial<GpsLocation>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The decimal notation of latitude, e.g. -43.5723 (World Geodetic System 1984).
   */
  @property()
  '5514'?: string;

  /**
   * The decimal notation of longitude, e.g. 153.21760 (World Geodetic System 1984).
   */
  @property()
  '5515'?: string;

  /**
   * The accuracy of the position in meters.
   */
  @property()
  '5516'?: string;

  /**
   * The velocity of the device as defined in 3GPP 23.032 GAD specification. This set of values may not be available if the device is static.
   */
  @property()
  '5517'?: any;

  /**
   * The timestamp of when the location measurement was performed.
   */
  @property()
  '5518'?: string;

  /**
   * The compass direction.
   */
  @property()
  '5705'?: number;
}

export interface GpsLocationRelations {
  // describe navigational properties here
}

export type GpsLocationWithRelations = GpsLocation & GpsLocationRelations;
