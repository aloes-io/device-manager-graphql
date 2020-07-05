import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - CellBlacklistEvent
 * Cell blacklist information
 */
@model({name: 'CellBlacklistEvent'})
export class CellBlacklistEvent {
  constructor(data?: Partial<CellBlacklistEvent>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

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

export interface CellBlacklistEventRelations {
  // describe navigational properties here
}

export type CellBlacklistEventWithRelations = CellBlacklistEvent &
  CellBlacklistEventRelations;
