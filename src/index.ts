import {ApplicationConfig} from '@loopback/core';
import {DeviceManagerApplication} from './application';
import {PubSubEERepository, PubSubMQTTRepository} from './repositories';
import {AloesBridge} from './aloes-bridge';
import {GraphQlBridge} from './graphql-bridge';

export {DeviceManagerApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new DeviceManagerApplication(options);
  await app.boot();
  await app.start();

  const url: string = app.restServer.url as string;
  console.log(`HTTP Server is running at ${url}`);

  const pubsubEERepository = await app.getRepository(PubSubEERepository);
  const pubsubMQTTRepository = await app.getRepository(PubSubMQTTRepository);

  app.graphQlBridge = new GraphQlBridge(app, options, pubsubEERepository);
  await app.graphQlBridge.start();

  app.aloesBridge = new AloesBridge(
    options,
    pubsubEERepository,
    pubsubMQTTRepository,
  );
  await app.aloesBridge.start();

  return app;
}
