import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {Filter} from '@loopback/repository';
import {MeasurementDataSource} from '../datasources';
import {Measurement} from '../models';

export const measurementsApiBaseUrl = MeasurementDataSource.baseURL;
export const measurementsApiEndPoint = MeasurementDataSource.endPoint;

export interface MeasurementApi {
  find(token: string, filter?: Filter<Measurement>): Promise<Measurement[]>;

  findById(token: string, measurementId: string): Promise<Measurement>;
}

export class MeasurementApiProvider implements Provider<MeasurementApi> {
  constructor(
    @inject('datasources.Measurement')
    protected dataSource: MeasurementDataSource = new MeasurementDataSource(),
  ) {}

  value(): Promise<MeasurementApi> {
    return getService(this.dataSource);
  }
}
