import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - HandoverEvent
 * handover event information
 */
@model({name: 'HandoverEvent'})
export class HandoverEvent {
  constructor(data?: Partial<HandoverEvent>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

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

export interface HandoverEventRelations {
  // describe navigational properties here
}

export type HandoverEventWithRelations = HandoverEvent & HandoverEventRelations;
