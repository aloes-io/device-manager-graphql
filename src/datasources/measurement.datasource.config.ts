const basePath = process.env.ALOES_SERVER_API_ROOT ?? '/api';
const baseUrl = process.env.ALOES_SERVER_URL ?? 'http://localhost:8000';
export const baseURL = `${baseUrl}${basePath}`;
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
