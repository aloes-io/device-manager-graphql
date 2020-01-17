import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class OmaObject extends Entity {
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
    required: false,
  })
  resourceIds: string;

  @property({
    type: 'object',
    required: true,
  })
  resources: object;

  constructor(data?: Partial<OmaObject>) {
    super(data);
  }
}

export interface OmaObjectRelations {
  // describe navigational properties here
}

export type OmaObjectWithRelations = OmaObject & OmaObjectRelations;
