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
      // port: +(process.env.PORT || 3000),
      // host: process.env.HOST,
      port: +(result.parsed ? result.parsed.SERVER_PORT : 3000),
      host: result.parsed ? result.parsed.SERVER_HOST : 'localhost',
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
        //   endpointMapping: {
        //     '/openapi.json': { version: '3.0.0', format: 'json' },
        //     '/openapi.yaml': { version: '3.0.0', format: 'yaml' },
        //   },
      },
      // mqtt: {
      //   url: result.parsed
      //     ? `${result.parsed.ALOES_BROKER_SCHEME}://${result.parsed.ALOES_BROKER_ROOT}`
      //     : 'ws://localhost:3000',
      //   options: {
      //     keepalive: 60,
      //     // reschedulePings: true,
      //     // protocolId: "MQTT",
      //     // protocolVersion: 4,
      //     // reconnectPeriod: 1000,
      //     // connectTimeout: 30 * 1000,
      //     // clean: true,
      //     clientId: result.parsed ? result.parsed.ALOES_CLIENT_ID : '',
      //     username: result.parsed ? result.parsed.ALOES_CLIENT_ID : '',
      //     password: result.parsed ? result.parsed.ALOES_CLIENT_KEY : '',
      //   },
      // },
    },
  };

  console.error('Starting the application...', config);

  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
