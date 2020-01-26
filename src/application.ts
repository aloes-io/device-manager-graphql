import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestBindings} from '@loopback/rest';
// import {HttpServer} from '@loopback/http-server';

import {ServiceMixin} from '@loopback/service-proxy';
import {CacheBindings, CacheComponent} from 'loopback-api-cache';
import {PubSubBindings, PubSubComponent} from 'loopback-pubsub-component';
import path from 'path';
import merge from 'lodash.merge';

// import {WebSocketServer} from './websocket.server';
import {CacheStrategyProvider, PubSubStrategyProvider} from './providers';
import {MySequence} from './sequence';

export class DeviceManagerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  // readonly httpServer: HttpServer;
  // readonly wsServer: WebSocketServer;

  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.component(PubSubComponent);
    this.bind(PubSubBindings.PUBSUB_STRATEGY).toProvider(
      PubSubStrategyProvider,
    );
    // this.bind(PubSubBindings.PUBSUB_CONFIG).to({
    //   host: 'localhost',
    // });

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

    // Create ws server from the http server
    // const wsServer = new WebSocketServer(this.httpServer);
    // this.bind('servers.websocket.server1').to(wsServer);
    // wsServer.use((socket, next) => {
    //   console.log('Global middleware - socket:', socket.id);
    //   next();
    // });
    // // Add a route
    // this.wsServer = wsServer;

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

  // start() {
  //   return this.wsServer.start();
  // }

  // stop() {
  //   return this.wsServer.stop();
  // }
}
