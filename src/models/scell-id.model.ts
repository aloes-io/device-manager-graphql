import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - ScellId
 * serving cell information that the RRC decides to camp on
 */
@model({name: 'ScellId'})
export class ScellId {
  constructor(data?: Partial<ScellId>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * IMEI of device
   */
  @property()
  '2'?: string;

  /**
   * PLMN - mcc/mnc
   */
  @property()
  '6030'?: number;

  /**
   * Band indicator
   */
  @property()
  '6031'?: number;

  /**
   * Cell Identity
   */
  @property()
  '6033'?: number;
}

export interface ScellIdRelations {
  // describe navigational properties here
}

export type ScellIdWithRelations = ScellId & ScellIdRelations;
