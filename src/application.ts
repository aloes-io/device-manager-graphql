import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestBindings} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {CacheBindings, CacheComponent} from 'loopback-api-cache';
import {CallbackBindings, CallbackComponent} from 'loopback-callback-component';
import {PubSubBindings, PubSubComponent} from 'loopback-pubsub-component';
import {EventEmitter} from 'events';
import {connect} from 'mqtt';
import path from 'path';
import merge from 'lodash.merge';
import {
  CacheStrategyProvider,
  CallbackStrategyProvider,
  PubSubStrategyProvider,
} from './providers';
import {MySequence} from './sequence';

export class DeviceManagerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    const mqttClient = connect(options.mqtt.url, {
      ...options.mqtt.options,
    });
    this.bind(PubSubBindings.CONFIG).to({
      eventEmitter: new EventEmitter(),
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

    // Setup security schemes available for endpoints
    const spec = this.getSync(RestBindings.API_SPEC);
    merge(spec, {
      components: {
        securitySchemes: {
          ...options.securitySchemes,
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
