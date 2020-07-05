import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - PlmnSearchEvent
 * List of all PLMNs found during the initial search/scan
 */
@model({name: 'PlmnSearchEvent'})
export class PlmnSearchEvent {
  constructor(data?: Partial<PlmnSearchEvent>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

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
   * EARFCN - frequency
   */
  @property()
  '6032'?: number;
}

export interface PlmnSearchEventRelations {
  // describe navigational properties here
}

export type PlmnSearchEventWithRelations = PlmnSearchEvent &
  PlmnSearchEventRelations;
