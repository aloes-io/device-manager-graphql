import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {Count, CountSchema, Filter, Where} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {AccessToken, UserCredential, User} from '../models';
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface UserApi {
  count(token: string, where?: Where<User>): Promise<Count>;

  find(token: string, limit: number, offset: number, filter?: Filter<User>): Promise<User[]>;

  findById(token: string, userId: string): Promise<User>;

  create(token: string, user: User): Promise<User>;

  replaceById(token: string, userId: string, user: User): Promise<User>;

  login(credentials: UserCredential): Promise<AccessToken>;

  logout(token: AccessToken): Promise<any>;
}

export class UserApiProvider implements Provider<UserApi> {
  constructor(
    // User must match the name property in the datasource json file
    @inject('datasources.User')
    protected dataSource: UserDataSource = new UserDataSource(),
  ) {}

  value(): Promise<UserApi> {
    return getService(this.dataSource);
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
