const application = require('./dist');

require('dotenv').config();

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.HTTP_SERVER_PORT
        ? process.env.HTTP_SERVER_PORT
        : 3001),
      host: process.env.HTTP_SERVER_HOST
        ? process.env.HTTP_SERVER_HOST
        : 'localhost',
      gracePeriodForClose: 5000,
      expressSettings: {
        'x-powered-by': false,
        // env: 'production',
      },
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
        //   endpointMapping: {
        //     '/openapi.json': { version: '3.0.0', format: 'json' },
        //   },
      },
      schemaPath: `${__dirname}/openapi.json`,
    },
    securitySchemes: {
      // BearerAuth: {
      //   type: 'http',
      //   scheme: 'bearer',
      // },
      // ApiKey: {
      //   type: 'apiKey',
      //   description: 'Device / Application API key',
      //   in: 'header',
      //   name: 'apikey',
      // },
      Authorization: {
        type: 'apiKey',
        description: 'User token',
        in: 'header',
        name: 'authorization',
      },
    },
    ws: {
      port: +(process.env.WS_SERVER_PORT ? process.env.WS_SERVER_PORT : 3002),
      host: process.env.WS_SERVER_HOST
        ? process.env.WS_SERVER_HOST
        : 'localhost',
    },
    graphql: {
      httpPath: process.env.GRAPHQL_HTTP_PATH
        ? process.env.GRAPHQL_HTTP_PATH
        : '/graphql',
      wsPath: process.env.GRAPHQL_WS_PATH
        ? process.env.GRAPHQL_WS_PATH
        : '/graphql',
      strict: false,
      viewer: true,
      fillEmptyResponses: true,
      operationIdFieldNames: true,
      headers: {
        'X-Origin': 'GraphQL',
      },
      schemaPath: `${__dirname}/openapi.graphql`,
      graphiql: process.env.NODE_ENV !== 'production',
    },
    mqtt: {
      url: `${
        process.env.ALOES_BROKER_URL
          ? process.env.ALOES_BROKER_URL
          : 'ws://localhost:3000'
      }`,
      subPrefix: `aloes-${
        process.env.ALOES_ID ? process.env.ALOES_ID : 0
      }/+/tx/+`,
      options: {
        keepalive: 60,
        reconnectPeriod: 1000,
        connectTimeout: 2 * 1000,
        clean: true,
        clientId: `aloes-${
          process.env.ALOES_ID ? process.env.ALOES_ID : 0
        }-graphql`,
        username: process.env.ALOES_ID ? process.env.ALOES_ID : '',
        password: process.env.ALOES_KEY ? process.env.ALOES_KEY : '',
      },
    },
  };

  // console.log('Starting the application...', config);

  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}

module.exports = application;
