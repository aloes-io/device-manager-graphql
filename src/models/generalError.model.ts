import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class GeneralError extends Entity {
  @property({
    type: 'number',
    // format: 'int32',
    required: true,
  })
  code: number;

  @property({
    type: 'string',
    required: false,
  })
  message: string;

  constructor(data?: Partial<GeneralError>) {
    super(data);
  }
}
