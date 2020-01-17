import dotenv from 'dotenv';

const result = dotenv.config();
// if (result.error) {
//   throw result.error
// }

const host = result.parsed ? result.parsed.ALOES_SERVER_HOST : 'localhost:8000';
const scheme = result.parsed ? result.parsed.ALOES_SERVER_SCHEME : 'http';
const basePath = result.parsed ? result.parsed.ALOES_SERVER_API_ROOT : '/api';
const baseURL = `${scheme}://${host}${basePath}`;
const resource = 'Sensors';

const sensorDefinition = {
  name: 'Sensor',
  connector: 'rest',
  baseURL: '',
  crud: true,
  debug: true,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${resource}`,
        headers: {
          authorization: '{token}',
        },
        query: {
          limit: '{limit}',
          offset: '{offset}',
          filter: '{filter}',
        },
      },
      functions: {
        find: ['token', 'limit', 'offset', 'filter'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${resource}/count`,
        headers: {
          authorization: '{token}',
        },
        query: {
          where: '{where}',
        },
      },
      functions: {
        count: ['token', 'where'],
      },
    },
    {
      template: {
        method: 'POST',
        url: `${baseURL}/${resource}`,
        headers: {
          authorization: '{token}',
        },
        body: '{sensor}',
      },
      functions: {
        create: ['token', 'sensor'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${resource}/{sensorId}`,
        headers: {
          authorization: '{token}',
        },
      },
      functions: {
        findById: ['token', 'sensorId'],
      },
    },
    {
      template: {
        method: 'PUT',
        url: `${baseURL}/${resource}/{sensorId}`,
        headers: {
          authorization: '{token}',
        },
        body: '{sensor}',
      },
      functions: {
        replaceById: ['token', 'sensorId', 'sensor'],
      },
    },
  ],
};

export default sensorDefinition;
