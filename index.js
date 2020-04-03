const dotenv = require('dotenv');
const application = require('./dist');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

module.exports = application;

if (require.main === module) {
  const config = {
    rest: {
      port: +(result.parsed.HTTP_SERVER_PORT || 3001),
      host: result.parsed.HTTP_SERVER_HOST || 'localhost',
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
        //     '/openapi.yaml': { version: '3.0.0', format: 'yaml' },
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
      port: +(result.parsed.WS_SERVER_PORT || 3002),
      host: result.parsed.WS_SERVER_HOST || 'localhost',
    },
    graphql: {
      path: result.parsed.GRAPHQL_PATH || '/graphql',
      strict: false,
      viewer: true,
      fillEmptyResponses: true,
      operationIdFieldNames: true,
      headers: {
        'X-Origin': 'GraphQL',
      },
      schemaPath: `${__dirname}/openapi.graphql`,
      graphiql: result.parsed.NODE_ENV !== 'production',
    },
    mqtt: {
      url: `${result.parsed.ALOES_BROKER_URL || 'ws://localhost:3000'}`,
      subPrefix: `aloes-${result.parsed.ALOES_ID || 0}/+/tx/+`,
      options: {
        keepalive: 60,
        // reschedulePings: true,
        // protocolId: 'MQTT',
        // protocolVersion: 4,
        reconnectPeriod: 1000,
        connectTimeout: 2 * 1000,
        clean: true,
        clientId: `aloes-${result.parsed.ALOES_ID || 0}-graphql`,
        username: result.parsed.ALOES_ID || '',
        password: result.parsed.ALOES_KEY || '',
      },
    },
  };

  // console.log('Starting the application...', config);

  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
