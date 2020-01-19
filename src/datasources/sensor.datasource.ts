import {inject, lifeCycleObserver, LifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {juggler} from '@loopback/repository';
import config, {baseURL, endPoint} from './sensor.datasource.config';

@lifeCycleObserver('datasource')
export class SensorDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'Sensor';
  static endPoint = endPoint;
  static baseURL = baseURL;

  constructor(
    @inject('datasources.config.Sensor', {optional: true})
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
