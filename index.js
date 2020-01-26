const application = require('./dist');
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

module.exports = application;

if (require.main === module) {
  // Run the application

  const config = {
    rest: {
      port: +(result.parsed ? result.parsed.SERVER_PORT : 3000),
      host: result.parsed ? result.parsed.SERVER_HOST : 'localhost',
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
        //   endpointMapping: {
        //     '/openapi.json': { version: '3.0.0', format: 'json' },
        //     '/openapi.yaml': { version: '3.0.0', format: 'yaml' },
        //   },
      },
    },
    securitySchemes: {
      // BearerAuth: {
      //   type: 'http',
      //   scheme: 'bearer',
      // },
      ApiKey: {
        type: 'apiKey',
        description: 'Device / Application API key',
        in: 'header',
        name: 'apikey',
      },
      Authorization: {
        type: 'apiKey',
        description: 'User token',
        in: 'header',
        name: 'authorization',
      },
    },
    mqtt: {
      url: result.parsed
        ? `${result.parsed.ALOES_BROKER_SCHEME}://${result.parsed.ALOES_BROKER_ROOT}`
        : 'ws://localhost:3000',
      options: {
        keepalive: 60,
        // reschedulePings: true,
        // protocolId: "MQTT",
        // protocolVersion: 4,
        // reconnectPeriod: 1000,
        // connectTimeout: 30 * 1000,
        // clean: true,
        clientId: result.parsed ? result.parsed.ALOES_CLIENT_ID : '',
        username: result.parsed ? result.parsed.ALOES_CLIENT_ID : '',
        password: result.parsed ? result.parsed.ALOES_CLIENT_KEY : '',
      },
    },
  };

  console.error('Starting the application...', config);

  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
