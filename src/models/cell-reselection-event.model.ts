import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - CellReselectionEvent
 * cell reselection event information
 */
@model({name: 'CellReselectionEvent'})
export class CellReselectionEvent {
  constructor(data?: Partial<CellReselectionEvent>) {
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
   * IMSI of device
   */
  @property()
  '3'?: string;

  /**
   * EARFCN - frequency
   */
  @property()
  '6032'?: number;

  /**
   * Cell Identity
   */
  @property()
  '6033'?: number;
}

export interface CellReselectionEventRelations {
  // describe navigational properties here
}

export type CellReselectionEventWithRelations = CellReselectionEvent &
  CellReselectionEventRelations;
