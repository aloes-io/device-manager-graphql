import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - MultistateSelector
 * represent the state of a Multi-state selector switch with a number of fixed positions.
 */
@model({name: 'MultistateSelector'})
export class MultistateSelector {
  constructor(data?: Partial<MultistateSelector>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The current state of a Multi-state input or selector.
   */
  @property()
  '5547'?: number;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;
}

export interface MultistateSelectorRelations {
  // describe navigational properties here
}

export type MultistateSelectorWithRelations = MultistateSelector &
  MultistateSelectorRelations;
