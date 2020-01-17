import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class OmaView extends Entity {
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
    type: 'object',
    required: true,
  })
  resources: object;

  @property({
    type: 'array',
    required: true,
    itemType: 'string',
  })
  icons: string[];

  constructor(data?: Partial<OmaView>) {
    super(data);
  }
}

export interface OmaViewRelations {
  // describe navigational properties here
}

export type OmaViewWithRelations = OmaView & OmaViewRelations;
