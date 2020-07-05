import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestBindings} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {CacheBindings, CacheComponent} from 'loopback-api-component';
import {CallbackBindings, CallbackComponent} from 'loopback-callback-component';
import {PubSubBindings, PubSubComponent} from 'loopback-pubsub-component';
import {EventEmitter2} from 'eventemitter2';
import {connect} from 'mqtt';
import path from 'path';
import merge from 'lodash.merge';
import {AloesBridge} from './aloes-bridge';
import {GraphQlBridge} from './graphql-bridge';
import {
  CacheStrategyProvider,
  CallbackStrategyProvider,
  PubSubStrategyProvider,
} from './providers';
import {MySequence} from './sequence';
import {deviceCallbacks, sensorCallbacks} from './utils';

export class DeviceManagerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  public graphQlBridge: GraphQlBridge;

  public aloesBridge: AloesBridge;

  constructor(options: ApplicationConfig = {}) {
    super(options);

    const mqttClient = connect(options.mqtt.url, {
      ...options.mqtt.options,
    });

    const eeServer = new EventEmitter2({
      wildcard: true,
      delimiter: '/',
      maxListeners: 20,
      verboseMemoryLeak: false,
    });

    this.bind(PubSubBindings.CONFIG).to({
      eventEmitter: eeServer,
      client: mqttClient,
    });
    this.component(PubSubComponent);
    this.bind(PubSubBindings.PUBSUB_STRATEGY).toProvider(
      PubSubStrategyProvider,
    );

    this.component(CallbackComponent);
    this.bind(CallbackBindings.CALLBACK_STRATEGY).toProvider(
      CallbackStrategyProvider,
    );

    this.component(CacheComponent);
    this.bind(CacheBindings.CACHE_STRATEGY).toProvider(CacheStrategyProvider);

    this.sequence(MySequence);

    this.static('/', path.join(__dirname, '../public'));

    // Setup security schemes and callbacks available for endpoints
    // make callbacks function taking pubsub type as argument
    const spec = this.getSync(RestBindings.API_SPEC);
    merge(spec, {
      components: {
        securitySchemes: {
          ...options.securitySchemes,
        },
        callbacks: {
          SensorEvents: {
            ...sensorCallbacks,
          },
          DeviceEvents: {
            ...deviceCallbacks,
          },
        },
      },
    });

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;

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
