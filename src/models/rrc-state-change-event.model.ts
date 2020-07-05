import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - RrcStateChangeEvent
 * Current RRC state change information, including the event that triggered the state change
 */
@model({name: 'RrcStateChangeEvent'})
export class RrcStateChangeEvent {
  constructor(data?: Partial<RrcStateChangeEvent>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The tool version that the device supports - used to determine the logging object/resource version to be used for parsing
   */
  @property()
  '1'?: string;
}

export interface RrcStateChangeEventRelations {
  // describe navigational properties here
}

export type RrcStateChangeEventWithRelations = RrcStateChangeEvent &
  RrcStateChangeEventRelations;
