import dotenv from 'dotenv';

const result = dotenv.config();
// if (result.error) {
//   throw result.error
// }

const host = result.parsed ? result.parsed.ALOES_SERVER_HOST : 'localhost:8000';
const scheme = result.parsed ? result.parsed.ALOES_SERVER_SCHEME : 'http';
const basePath = result.parsed ? result.parsed.ALOES_SERVER_API_ROOT : '/api';
export const baseURL = `${scheme}://${host}${basePath}`;
export const endPoint = 'Devices';

const deviceDefintion = {
  name: 'Device',
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
        body: '{device}',
      },
      functions: {
        create: ['token', 'device'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${endPoint}/{deviceId}`,
        headers: {
          authorization: '{token}',
        },
      },
      functions: {
        findById: ['token', 'deviceId'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${endPoint}/{deviceId}/sensors`,
        headers: {
          authorization: '{token}',
        },
        query: {
          filter: '{filter}',
        },
      },
      functions: {
        findSensors: ['token', 'deviceId', 'filter'],
      },
    },
    {
      template: {
        method: 'PUT',
        url: `${baseURL}/${endPoint}/{deviceId}`,
        headers: {
          authorization: '{token}',
        },
        body: '{device}',
      },
      functions: {
        replaceById: ['token', 'deviceId', 'device'],
      },
    },
    {
      template: {
        method: 'POST',
        url: `${baseURL}/${endPoint}/authenticate`,
        body: '{credentials}',
      },
      functions: {
        login: ['credentials'],
      },
    },
    {
      template: {
        method: 'POST',
        url: `${baseURL}/${endPoint}/get-state`,
        headers: {
          apikey: '{apiKey}',
        },
        body: '{deviceId}',
      },
      functions: {
        login: ['apiKey', 'deviceId'],
      },
    },
  ],
};

export default deviceDefintion;
