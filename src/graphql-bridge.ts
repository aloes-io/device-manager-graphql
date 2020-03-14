/* eslint-disable @typescript-eslint/no-explicit-any */
import {ApplicationConfig} from '@loopback/core';
import {repository} from '@loopback/repository';
import graphqlHTTP from 'express-graphql';
import {execute, subscribe, GraphQLSchema, printSchema} from 'graphql';
import {Server, createServer} from 'http';
import {createGraphQLSchema} from 'openapi-to-graphql';
import {Oas3} from 'openapi-to-graphql/lib/types/oas3';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {DeviceManagerApplication} from './application';
import {PubSubEERepository} from './repositories';
import {removeFile, writeFile} from './utils';

type GraphQLBridgeOptions = {
  openAPISchemaPath: string;
  graphQLSchemaPath: string;
  endpoint: string;
  headers?: {[key: string]: string};
  graphiql: boolean;
};

export class GraphQlBridge {
  private app: DeviceManagerApplication;
  private httpServer: Server;
  private subscriptionServer: SubscriptionServer;
  private bridgeOptions: GraphQLBridgeOptions;
  // public endpoints: string[] = ['/graphql', '/subscriptions'];

  constructor(
    app: DeviceManagerApplication,
    options: ApplicationConfig,
    @repository(PubSubEERepository) protected pubsub: PubSubEERepository,
  ) {
    this.app = app;
    this.bridgeOptions = {
      openAPISchemaPath: options.rest.schemaPath,
      graphQLSchemaPath: options.graphql.schemaPath,
      endpoint: options.graphql.path,
      graphiql: options.graphql.graphiql,
    };

    this.httpServer = createServer((req, res) => {
      console.log(' this.httpServer listener', req.headers);
    }).listen(options.ws.port, options.ws.host, () => {
      console.log(
        `Websocket Server is now running on ws://${options.ws.host}:${options.ws.port}`,
      );
    });
  }

  async createSchema(): Promise<GraphQLSchema | null> {
    try {
      const oas: Oas3 = <Oas3>await this.app.restServer.getApiSpec();
      const {schema, report} = await createGraphQLSchema(oas, {
        strict: false,
        viewer: true,
        fillEmptyResponses: true,
        operationIdFieldNames: true,
        baseUrl: this.app.restServer.url,
        headers: this.bridgeOptions.headers,
        // tokenJSONpath: '$.jwt',
      });

      console.log('GRAPHQL REPORT : ', report);
      // const rootPath = `${__dirname}/..`;
      // const openApiPath = `${rootPath}/openapi.json`;
      // const graphQlSchemaPath = `${rootPath}/openapi.graphql`;
      await removeFile(this.bridgeOptions.openAPISchemaPath);
      await removeFile(this.bridgeOptions.graphQLSchemaPath);
      await writeFile(
        this.bridgeOptions.openAPISchemaPath,
        JSON.stringify(oas, null, 2),
      );
      await writeFile(
        this.bridgeOptions.graphQLSchemaPath,
        printSchema(schema),
      );
      return schema;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async mountEndpoints(schema: GraphQLSchema): Promise<void> {
    const handler: graphqlHTTP.Middleware = graphqlHTTP(
      (req, res, graphQLParams) => ({
        schema,
        pretty: true,
        graphiql: this.bridgeOptions.graphiql,
        // context: {jwt: getJwt(req)},
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
    this.app.mountExpressRouter(this.bridgeOptions.endpoint, handler);
    // const server = await this.app.getServer(RestServer);

    this.subscriptionServer = new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: (params: any, socket: any, ctx: any) => {
          // control headers ?
          console.log('GRAPHQL WS onConnect', params);
          return {pubsub: this.pubsub};
        },
      },
      {
        server: this.httpServer,
        path: this.bridgeOptions.endpoint,
      },
    );
  }

  async start(): Promise<void> {
    const schema = await this.createSchema();
    if (schema && schema !== null) {
      await this.mountEndpoints(schema);
    }
  }

  async stop(): Promise<void> {
    this.subscriptionServer.close();
    this.httpServer.close();
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
