import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestBindings} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {CacheBindings, CacheComponent} from 'loopback-api-cache';
import path from 'path';
import merge from 'lodash.merge';
import {CacheStrategyProvider} from './providers';
import {MySequence} from './sequence';

export class DeviceManagerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.component(CacheComponent);
    this.bind(CacheBindings.CACHE_STRATEGY).toProvider(CacheStrategyProvider);

    this.sequence(MySequence);

    this.static('/', path.join(__dirname, '../public'));

    // Setup security schemes available for endpoints
    const spec = this.getSync(RestBindings.API_SPEC);
    merge(spec, {
      components: {
        securitySchemes: {
          // BearerAuth: {
          //   type: 'http',
          //   scheme: 'bearer',
          // },
          ApiKey: {
            type: 'apiKey',
            description: 'Device / Application API key',
            in: 'header',
            name: 'apikey',
          },
          Authorization: {
            type: 'apiKey',
            description: 'User token',
            in: 'header',
            name: 'authorization',
          },
        },
      },
    });

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // this.mqttClient = connect(
    //   options.mqtt.url,
    //   options.mqtt.options,
    // );
    // this.mqttClient.on('connect', () => {
    //   console.log('mqtt client connected!');
    // });

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
