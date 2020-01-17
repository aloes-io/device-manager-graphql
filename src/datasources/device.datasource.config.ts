import dotenv from 'dotenv';

const result = dotenv.config();
// if (result.error) {
//   throw result.error
// }

const host = result.parsed ? result.parsed.ALOES_SERVER_HOST : 'localhost:8000';
const scheme = result.parsed ? result.parsed.ALOES_SERVER_SCHEME : 'http';
const basePath = result.parsed ? result.parsed.ALOES_SERVER_API_ROOT : '/api';
const baseURL = `${scheme}://${host}${basePath}`;
const resource = 'Devices';

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
        url: `${baseURL}/${resource}`,
        headers: {
          authorization: '{token}',
        },
        query: {
          limit: '{limit}',
          // offset: '{offset}',
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
        body: '{device}',
      },
      functions: {
        create: ['token', 'device'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${resource}/{deviceId}`,
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
        method: 'PUT',
        url: `${baseURL}/${resource}/{deviceId}`,
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
        url: `${baseURL}/${resource}/authenticate`,
        body: '{credentials}',
      },
      functions: {
        login: ['credentials'],
      },
    },
    {
      template: {
        method: 'POST',
        url: `${baseURL}/${resource}/get-state`,
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
