import {model} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - RrcTimerExpiryEvent
 * RRC timer expiry event information
 */
@model({name: 'RrcTimerExpiryEvent'})
export class RrcTimerExpiryEvent {
  constructor(data?: Partial<RrcTimerExpiryEvent>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }
}

export interface RrcTimerExpiryEventRelations {
  // describe navigational properties here
}

export type RrcTimerExpiryEventWithRelations = RrcTimerExpiryEvent &
  RrcTimerExpiryEventRelations;
