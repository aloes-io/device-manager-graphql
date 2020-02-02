/* eslint-disable @typescript-eslint/no-explicit-any */
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import graphqlHTTP from 'express-graphql';
import {printSchema} from 'graphql';
import {createGraphQLSchema} from 'openapi-to-graphql';
import {Oas3} from 'openapi-to-graphql/lib/types/oas3';
import {execute, subscribe, GraphQLSchema} from 'graphql';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {DeviceManagerApplication} from './application';
import {PubSubEERepository} from './repositories';
import {removeFile, writeFile} from './utils';

export class GraphQlBridge {
  private app: DeviceManagerApplication;
  public endpoints: string[] = ['/graphql', '/subscriptions'];

  constructor(
    app: DeviceManagerApplication,
    @repository(PubSubEERepository) protected pubsub: PubSubEERepository,
  ) {
    this.app = app;
  }

  async createSchema(): Promise<GraphQLSchema | null> {
    try {
      const oas: Oas3 = <Oas3>this.app.restServer.getApiSpec();
      const {schema, report} = await createGraphQLSchema(oas, {
        strict: false,
        viewer: true,
        fillEmptyResponses: true,
        operationIdFieldNames: true,
        baseUrl: this.app.restServer.url,
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
      return schema;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async mountEndpoints(schema: GraphQLSchema): Promise<void> {
    try {
      const handler: graphqlHTTP.Middleware = graphqlHTTP(
        (request, response, graphQLParams) => ({
          schema,
          pretty: true,
          graphiql: true,
          // graphiql: process.env.NODE_ENV === 'development',
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
      this.app.mountExpressRouter(this.endpoints[0], handler);

      const server = await this.app.getServer(this.app.RestServer);

      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
          onConnect: (params: any, socket: any, ctx: any) => {
            // adding pubsub to subscribe context
            return {pubsub: this.pubsub};
          },
        },
        {
          server,
          path: this.endpoints[1],
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  async start() {
    const schema = await this.createSchema();
    if (schema && schema !== null) {
      await this.mountEndpoints(schema);
    }
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
