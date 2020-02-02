import {ApplicationConfig} from '@loopback/core';
import {inject} from '@loopback/context';
import {DeviceManagerApplication} from './application';
import {PubSubEERepository, PubSubMQTTRepository} from './repositories';
import {AloesBridge} from './aloes-bridge';
import {GraphQlBridge} from './graphql-bridge';

export {DeviceManagerApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new DeviceManagerApplication(options);
  try {
    await app.boot();
    await app.start();

    const url: string = <string>app.restServer.url;
    console.log(`Server is running at ${url}`);

    const pubsubEERepository = await app.getRepository(PubSubEERepository);
    const pubsubMQTTRepository = await app.getRepository(PubSubMQTTRepository);

    const graphQlBridge = new GraphQlBridge(app, pubsubEERepository);
    await graphQlBridge.start();

    const aloesBridge = new AloesBridge(
      pubsubEERepository,
      pubsubMQTTRepository,
    );
    await aloesBridge.start();

    return app;
  } catch (e) {
    return app;
  }
}
