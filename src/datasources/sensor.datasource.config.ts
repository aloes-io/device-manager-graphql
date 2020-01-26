import dotenv from 'dotenv';

const result = dotenv.config();
// if (result.error) {
//   throw result.error
// }

const host = result.parsed ? result.parsed.ALOES_SERVER_HOST : 'localhost:8000';
const scheme = result.parsed ? result.parsed.ALOES_SERVER_SCHEME : 'http';
const basePath = result.parsed ? result.parsed.ALOES_SERVER_API_ROOT : '/api';
export const baseURL = `${scheme}://${host}${basePath}`;
export const endPoint = 'Sensors';

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
        url: `${baseURL}/${endPoint}`,
        headers: {
          authorization: '{token}',
        },
        query: {
          filter: '{filter}',
        },
      },
      functions: {
        find: ['token', 'filter'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${endPoint}/count`,
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
        url: `${baseURL}/${endPoint}`,
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
        url: `${baseURL}/${endPoint}/{sensorId}`,
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
        url: `${baseURL}/${endPoint}/{sensorId}`,
        headers: {
          authorization: '{token}',
        },
        body: '{sensor}',
      },
      functions: {
        replaceById: ['token', 'sensorId', 'sensor'],
      },
    },
    {
      template: {
        method: 'PATCH',
        url: `${baseURL}/${endPoint}/{sensorId}`,
        headers: {
          authorization: '{token}',
        },
        body: '{sensor}',
      },
      functions: {
        updateById: ['token', 'sensorId', 'sensor'],
      },
    },
    {
      template: {
        method: 'DELETE',
        url: `${baseURL}/${endPoint}/{sensorId}`,
        headers: {
          authorization: '{token}',
        },
      },
      functions: {
        deleteById: ['token', 'sensorId'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${endPoint}/{sensorId}/measurements`,
        headers: {
          authorization: '{token}',
        },
        query: {
          filter: '{filter}',
        },
      },
      functions: {
        findMeasurements: ['token', 'sensorId', 'filter'],
      },
    },
  ],
};

export default sensorDefinition;
