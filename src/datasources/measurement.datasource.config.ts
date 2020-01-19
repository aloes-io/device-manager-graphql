import dotenv from 'dotenv';

const result = dotenv.config();
// if (result.error) {
//   throw result.error
// }

const host = result.parsed ? result.parsed.ALOES_SERVER_HOST : 'localhost:8000';
const scheme = result.parsed ? result.parsed.ALOES_SERVER_SCHEME : 'http';
const basePath = result.parsed ? result.parsed.ALOES_SERVER_API_ROOT : '/api';
export const baseURL = `${scheme}://${host}${basePath}`;
export const endPoint = 'Measurements';

const deviceDefintion = {
  name: 'Measurement',
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
        url: `${baseURL}/${endPoint}/{measurementId}`,
        headers: {
          authorization: '{token}',
        },
      },
      functions: {
        findById: ['token', 'measurementId'],
      },
    },
  ],
};

export default deviceDefintion;
