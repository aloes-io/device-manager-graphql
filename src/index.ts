/* eslint-disable @typescript-eslint/no-explicit-any */
import {ApplicationConfig} from '@loopback/core';
import {inject} from '@loopback/context';
import graphqlHTTP from 'express-graphql';
import {printSchema} from 'graphql';
import {createGraphQlSchema} from 'openapi-to-graphql';
import {Oas3} from 'openapi-to-graphql/lib/types/oas3';
// import {execute, subscribe} from 'graphql';
// import {SubscriptionServer} from 'subscriptions-transport-ws';
import {removeFile, writeFile} from './utils';
import {DeviceManagerApplication} from './application';
import {PubSubRepository} from './repositories';

export {DeviceManagerApplication};

async function mountGraphQl(app: DeviceManagerApplication) {
  const graphQlPath = '/graphql';
  const oas: Oas3 = <Oas3>app.restServer.getApiSpec();

  const {schema, report} = await createGraphQlSchema(oas, {
    strict: false,
    viewer: true,
    fillEmptyResponses: true,
    operationIdFieldNames: true,
    baseUrl: app.restServer.url,
    headers: {
      'X-Origin': 'GraphQL',
    },
    // tokenJSONpath: '$.jwt',
    // customResolvers: {
    //   'LoopBack Application': {
    //     '/users/{userId}': {
    //       get: (obj, args, ctx, info) => {
    //         console.log('users/{userId}', obj, args, ctx);
    //       },
    //     },
    //   },
    // },
  });

  console.log('GRAPHQL REPORT : ', report);
  const rootPath = `${__dirname}/..`;
  const openApiPath = `${rootPath}/openapi.json`;
  const graphQlSchemaPath = `${rootPath}/openapi.graphql`;
  await removeFile(openApiPath);
  await removeFile(graphQlSchemaPath);
  await writeFile(openApiPath, JSON.stringify(oas, null, 2));
  await writeFile(graphQlSchemaPath, printSchema(schema));

  const handler: graphqlHTTP.Middleware = graphqlHTTP(
    (request, response, graphQLParams) => ({
      schema,
      pretty: true,
      graphiql: process.env.NODE_ENV === 'development',
      // context: {jwt: getJwt(request)},
    }),
  );

  // Get the jwt from the Authorization header and place in context.jwt, which is then referenced in tokenJSONpath
  // function getJwt(req: any) {
  //   console.log('getJWT', req.headers);
  //   if (req.headers && req.headers.authorization) {
  //     return req.headers.authorization;
  //     // return req.headers.authorization.replace(/^Bearer /, '');
  //   }
  // }

  // Waiting for changes in openapi-graphql to be merged to implement this :
  // const server = await app.getServer(app.RestServer);
  // or
  // const server = app.wsServer;
  // const pubsub = await app.getRepository(PubSubRepository);

  // new SubscriptionServer(
  //   {
  //     execute,
  //     subscribe,
  //     schema,
  //     onConnect: (params: any, socket: any, ctx: any) => {
  //       // adding pubsub to subscribe context
  //       return { pubsub }
  //     }
  //   },
  //   {
  //     server,
  //     path: '/subscriptions'
  //   }
  // )

  app.mountExpressRouter(graphQlPath, handler);
}

function onMessage(...args: any[]) {
  console.log('MESSAGE RECEIVED', args);
}

export async function main(options: ApplicationConfig = {}) {
  const app = new DeviceManagerApplication(options);
  await app.boot();
  await app.start();

  const url: string = <string>app.restServer.url;
  console.log(`Server is running at ${url}`);

  await mountGraphQl(app);

  const path = 'root';
  const pubsub = await app.getRepository(PubSubRepository);
  await pubsub.subscribe(path, onMessage);
  // const iterator = await pubsub.asyncIterator(path);
  // iterator.next().then(res => {
  //   console.log('MESSAGE RECEIVED', res);
  // });

  await pubsub.publish(path, {message: 'hey'});

  return app;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
