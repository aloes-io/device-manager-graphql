import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class OmaResource extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  unit: string;

  @property({
    type: 'string',
    required: false,
  })
  type: string;

  @property({
    type: 'string',
    required: false,
  })
  range: string;

  constructor(data?: Partial<OmaResource>) {
    super(data);
  }
}

export interface OmaResourceRelations {
  // describe navigational properties here
}

export type OmaResourceWithRelations = OmaResource & OmaResourceRelations;
