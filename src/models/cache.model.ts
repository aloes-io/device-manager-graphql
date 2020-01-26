/* eslint-disable @typescript-eslint/no-explicit-any */
import {Entity, model, property} from '@loopback/repository';

@model({settings: {hidden: ['id']}})
export class Cache extends Entity {
  @property({
    type: 'string',
    generated: true,
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'any',
    required: true,
  })
  data: any;

  @property({
    type: 'number',
    required: true,
  })
  ttl: number;

  constructor(data?: Partial<Cache>) {
    super(data);
  }
}

export interface CacheRelations {
  // describe navigational properties here
}

export type CacheWithRelations = Cache & CacheRelations;
/* eslint-enable @typescript-eslint/no-explicit-any */
