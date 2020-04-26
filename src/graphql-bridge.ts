/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
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
// import {Socket} from 'dgram';

type GraphQLBridgeOptions = {
  openAPISchemaPath: string;
  graphQLSchemaPath: string;
  httpEndpoint: string;
  wsEndpoint: string;
  headers?: {[key: string]: string};
  graphiql: boolean;
};

type WSCredentials = {
  username: string;
  password: string;
  client?: Object;
};

const authentificationRequest = async (body: WSCredentials) => {
  const baseUrl = `${process.env.ALOES_SERVER_URL}${process.env.ALOES_SERVER_API_ROOT}`;
  const {data} = await axios.post(`${baseUrl}/authenticate`, body, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'aloes-id': process.env.ALOES_ID,
      'aloes-key': process.env.ALOES_KEY,
    },
  });
  return data || null;
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
      httpEndpoint: options.graphql.httpPath,
      wsEndpoint: options.graphql.wsPath,
      graphiql: options.graphql.graphiql,
    };

    this.httpServer = createServer().listen(
      options.ws.port,
      options.ws.host,
      () => {
        console.log(
          `WS Server is running @ ws://${options.ws.host}:${options.ws.port}`,
        );
      },
    );
  }

  async createSchema(): Promise<GraphQLSchema | null> {
    try {
      const oas: Oas3 = <Oas3>await this.app.restServer.getApiSpec();
      const {schema, report} = await createGraphQLSchema(oas, {
        strict: false,
        viewer: true,
        fillEmptyResponses: true,
        operationIdFieldNames: true,
        createSubscriptionsFromCallbacks: true,
        baseUrl: this.app.restServer.url,
        headers: this.bridgeOptions.headers,
        // tokenJSONpath: '$.jwt',
      });

      console.log('GRAPHQL REPORT : ', report);

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
    this.app.mountExpressRouter(this.bridgeOptions.httpEndpoint, handler);

    this.subscriptionServer = new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: async (params: Object, socket: any, ctx: any) => {
          // consider creating a new pubsub client with params ?
          const credentials: WSCredentials = params as WSCredentials;
          const {username, password} = credentials;
          if (!username || !password) {
            throw new Error('Please provide valid credentials in WS params');
          }
          // console.log(socket._socket.remoteAddress, ctx.request.connection.remoteAddress);
          const client = {
            ip: socket._socket.remoteAddress,
            id: `${username}-${Math.random()
              .toString(16)
              .substr(2, 8)}`,
          };

          const body = {client, username, password};
          console.log('GRAPHQL WS onConnect');
          const {status} = await authentificationRequest(body);
          if (status !== 0) {
            throw new Error('Invalid credentials');
          }
          return {pubsub: this.pubsub};
        },
        onDisconnect: (socket: WebSocket, ctx: any) => {
          // delete created client with params, if any
          console.log('GRAPHQL WS onDisconnect');
        },
      },
      {
        server: this.httpServer,
        path: this.bridgeOptions.wsEndpoint,
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
