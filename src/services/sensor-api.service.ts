import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {Count, Filter, Where} from '@loopback/repository';
import {SensorDataSource} from '../datasources';
import {Measurement, Sensor, SensorResources} from '../models';

export const sensorsApiBaseUrl = SensorDataSource.baseURL;
export const sensorsApiEndPoint = SensorDataSource.endPoint;

export interface SensorApi {
  count(token: string, where?: Where<Sensor>): Promise<Count>;

  find(token: string, filter?: Filter<Sensor>): Promise<Sensor[]>;

  findById(token: string, sensorId: string): Promise<Sensor>;

  create(token: string, sensor: Sensor): Promise<Sensor>;

  updateById(
    token: string,
    sensorId: string,
    sensor: Sensor | Partial<Sensor>,
  ): Promise<Sensor>;

  replaceById(token: string, sensorId: string, sensor: Sensor): Promise<Sensor>;

  deleteById(token: string, sensorId: string): Promise<{id: string}>;

  findMeasurements(
    token: string,
    sensorId: string,
    filter?: Filter<Measurement>,
  ): Promise<Measurement[]>;

  findResources(
    token: string,
    sensorId: string,
  ): Promise<SensorResources | null>;

  updateResources(
    token: string,
    sensorId: string,
    resources: SensorResources,
  ): Promise<SensorResources>;

  deleteResources(token: string, sensorId: string): Promise<Boolean>;
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
