import {Entity, hasMany, model, property} from '@loopback/repository';
import {Device} from './device.model';
import {Sensor} from './sensor.model';

@model({settings: {}})
export class User extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  fullAddress: string;

  @property({
    type: 'number',
    required: true,
  })
  avatarImgUrl: number;

  @property({
    type: 'string',
    required: true,
  })
  headerImgUrl: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @hasMany(() => Device, {keyTo: 'ownerId'})
  devices?: Device[];

  @hasMany(() => Sensor, {keyTo: 'ownerId'})
  sensors?: Sensor[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

@model({settings: {}})
export class UserCredential extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  constructor(data?: Partial<UserCredential>) {
    super(data);
  }
}
