import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {juggler} from '@loopback/repository';
// import config from './user.datasource.config.json';
import config, {baseURL, endPoint} from './user.datasource.config';

@lifeCycleObserver('datasource')
export class UserDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'User';
  static endPoint = endPoint;
  static baseURL = baseURL;

  constructor(
    @inject('datasources.config.User', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
