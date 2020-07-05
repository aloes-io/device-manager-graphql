import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - RadioLinkFailureEvent
 * Radio Link Failure Event
 */
@model({name: 'RadioLinkFailureEvent'})
export class RadioLinkFailureEvent {
  constructor(data?: Partial<RadioLinkFailureEvent>) {
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

export interface RadioLinkFailureEventRelations {
  // describe navigational properties here
}

export type RadioLinkFailureEventWithRelations = RadioLinkFailureEvent &
  RadioLinkFailureEventRelations;
