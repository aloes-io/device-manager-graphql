import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {Count, CountSchema, Filter, Where} from '@loopback/repository';
import {DeviceDataSource} from '../datasources';
import {Device, DeviceAuthResponse, DeviceCredential, Sensor} from '../models';
/* eslint-disable @typescript-eslint/no-explicit-any */

export const devicesApiBaseUrl = DeviceDataSource.baseURL;
export const devicesApiEndPoint = DeviceDataSource.endPoint;

export interface DeviceApi {
  count(token: string, where?: Where<Device>): Promise<Count>;

  find(token: string, filter?: Filter<Device>): Promise<Device[]>;

  findById(token: string, deviceId: string): Promise<Device>;

  findSensors(token: string, deviceId: string, filter?: Filter<Sensor>): Promise<Sensor[]>;

  create(token: string, device: Device): Promise<Device>;

  replaceById(token: string, deviceId: string, device: Device): Promise<Device>;

  authenticate(credentials: DeviceCredential): Promise<DeviceAuthResponse>;
}

export class DeviceApiProvider implements Provider<DeviceApi> {
  constructor(
    @inject('datasources.Device')
    protected dataSource: DeviceDataSource = new DeviceDataSource(),
  ) {}

  value(): Promise<DeviceApi> {
    return getService(this.dataSource);
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
