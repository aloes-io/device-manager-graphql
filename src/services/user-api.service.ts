/* eslint-disable @typescript-eslint/no-explicit-any */
import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {Count, Filter, Where} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {AccessToken, Device, Sensor, UserCredential, User} from '../models';

export const usersApiBaseUrl = UserDataSource.baseURL;
export const usersApiEndPoint = UserDataSource.endPoint;

export interface UserApi {
  count(token: string, where?: Where<User>): Promise<Count>;

  find(token: string, filter?: Filter<User>): Promise<User[]>;

  findById(token: string, userId: string): Promise<User>;

  findDevices(
    token: string,
    userId: string,
    filter?: Filter<Device>,
  ): Promise<Device[]>;

  findDevicesCount(
    token: string,
    userId: string,
    where?: Where<Device>,
  ): Promise<Count>;

  findSensors(
    token: string,
    userId: string,
    filter?: Filter<Sensor>,
  ): Promise<Sensor[]>;

  findSensorsCount(
    token: string,
    userId: string,
    where?: Where<Sensor>,
  ): Promise<Count>;

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
