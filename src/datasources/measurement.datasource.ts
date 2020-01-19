import {inject, lifeCycleObserver, LifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {juggler} from '@loopback/repository';
import config, {baseURL, endPoint} from './measurement.datasource.config';

@lifeCycleObserver('datasource')
export class MeasurementDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'Measurement';
  static endPoint = endPoint;
  static baseURL = baseURL;

  constructor(
    @inject('datasources.config.Measurement', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
