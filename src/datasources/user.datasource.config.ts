import dotenv from 'dotenv';

const result = dotenv.config();
// if (result.error) {
//   throw result.error
// }

const host = result.parsed ? result.parsed.ALOES_SERVER_HOST : 'localhost:8000';
const scheme = result.parsed ? result.parsed.ALOES_SERVER_SCHEME : 'http';
const basePath = result.parsed ? result.parsed.ALOES_SERVER_API_ROOT : '/api';
export const baseURL = `${scheme}://${host}${basePath}`;
export const endPoint = 'Users';

const userDefintion = {
  name: 'User',
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
        body: '{user}',
      },
      functions: {
        create: ['token', 'user'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${endPoint}/{userId}`,
        headers: {
          authorization: '{token}',
        },
      },
      functions: {
        findById: ['token', 'userId'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${endPoint}/{userId}/devices`,
        headers: {
          authorization: '{token}',
        },
        query: {
          filter: '{filter}',
        },
      },
      functions: {
        findDevices: ['token', 'userId', 'filter'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${endPoint}/{userId}/sensors`,
        headers: {
          authorization: '{token}',
        },
        query: {
          filter: '{filter}',
        },
      },
      functions: {
        findSensors: ['token', 'userId', 'filter'],
      },
    },
    {
      template: {
        method: 'PUT',
        url: `${baseURL}/${endPoint}/{userId}`,
        headers: {
          authorization: '{token}',
        },
        body: '{user}',
      },
      functions: {
        replaceById: ['token', 'userId', 'user'],
      },
    },
    {
      template: {
        method: 'POST',
        url: `${baseURL}/${endPoint}/login`,
        body: '{credentials}',
      },
      functions: {
        login: ['credentials'],
      },
    },
    {
      template: {
        method: 'POST',
        url: `${baseURL}/${endPoint}/logout`,
        body: '{token}',
      },
      functions: {
        logout: ['token'],
      },
    },
  ],
};

export default userDefintion;
