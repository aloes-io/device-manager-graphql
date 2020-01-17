import dotenv from 'dotenv';

const result = dotenv.config();
// if (result.error) {
//   throw result.error
// }

const host = result.parsed ? result.parsed.ALOES_SERVER_HOST : 'localhost:8000';
const scheme = result.parsed ? result.parsed.ALOES_SERVER_SCHEME : 'http';
const basePath = result.parsed ? result.parsed.ALOES_SERVER_API_ROOT : '/api';
const baseURL = `${scheme}://${host}${basePath}`;
const resource = 'Users';

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
        body: '{user}',
      },
      functions: {
        create: ['token', 'user'],
      },
    },
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${resource}/{userId}`,
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
        method: 'PUT',
        url: `${baseURL}/${resource}/{userId}`,
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
        url: `${baseURL}/${resource}/login`,
        body: '{credentials}',
      },
      functions: {
        login: ['credentials'],
      },
    },
    {
      template: {
        method: 'POST',
        url: `${baseURL}/${resource}/logout`,
        body: '{token}',
      },
      functions: {
        logout: ['token'],
      },
    },
  ],
};

export default userDefintion;
