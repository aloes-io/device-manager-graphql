import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {Count, CountSchema, Filter, Where} from '@loopback/repository';
import {SensorDataSource} from '../datasources';
import {Sensor} from '../models';
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SensorApi {
  count(token: string, where?: Where<Sensor>): Promise<Count>;

  find(token: string, limit: number, offset: number, filter?: Filter<Sensor>): Promise<Sensor[]>;

  findById(token: string, sensorId: string): Promise<Sensor>;

  create(token: string, sensor: Sensor): Promise<Sensor>;

  replaceById(token: string, sensorId: string, sensor: Sensor): Promise<Sensor>;
}

export class SensorApiProvider implements Provider<SensorApi> {
  constructor(
    @inject('datasources.Sensor')
    protected dataSource: SensorDataSource = new SensorDataSource(),
  ) {}

  value(): Promise<SensorApi> {
    return getService(this.dataSource);
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
