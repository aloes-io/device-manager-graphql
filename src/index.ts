import {DeviceManagerApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import graphqlHTTP from 'express-graphql';
import {createGraphQlSchema} from 'openapi-to-graphql';
import {Oas3} from 'openapi-to-graphql/lib/types/oas3';

export {DeviceManagerApplication};

async function mountGraphQl(app: DeviceManagerApplication, oas: Oas3) {
  const graphqlPath = '/graphql';
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

  const handler: graphqlHTTP.Middleware = graphqlHTTP((request, response, graphQLParams) => ({
    schema,
    pretty: true,
    graphiql: process.env.NODE_ENV === 'development',
    // context: {jwt: getJwt(request)},
  }));

  // Get the jwt from the Authorization header and place in context.jwt, which is then referenced in tokenJSONpath
  // function getJwt(req: any) {
  //   console.log('getJWT', req.headers);
  //   if (req.headers && req.headers.authorization) {
  //     return req.headers.authorization;
  //     // return req.headers.authorization.replace(/^Bearer /, '');
  //   }
  // }

  app.mountExpressRouter(graphqlPath, handler);
}

export async function main(options: ApplicationConfig = {}) {
  const app = new DeviceManagerApplication(options);
  await app.boot();
  await app.start();

  const url: string = <string>app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
  const oas: Oas3 = <Oas3>app.restServer.getApiSpec();

  await mountGraphQl(app, oas);

  return app;
}
