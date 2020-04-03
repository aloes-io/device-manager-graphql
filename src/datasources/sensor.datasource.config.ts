const basePath = process.env.ALOES_SERVER_API_ROOT ?? '/api';
const baseUrl = process.env.ALOES_SERVER_URL ?? 'http://localhost:8000';
export const baseURL = `${baseUrl}${basePath}`;
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
    {
      template: {
        method: 'GET',
        url: `${baseURL}/${endPoint}/{sensorId}/resources`,
        headers: {
          authorization: '{token}',
        },
      },
      functions: {
        findResources: ['token', 'sensorId'],
      },
    },
    {
      template: {
        method: 'PUT',
        url: `${baseURL}/${endPoint}/{sensorId}/resources`,
        headers: {
          authorization: '{token}',
        },
        body: {
          resources: '{resources}',
        },
      },
      functions: {
        replaceResources: ['token', 'sensorId', 'resources'],
      },
    },
    {
      template: {
        method: 'DELETE',
        url: `${baseURL}/${endPoint}/{sensorId}/resources`,
        headers: {
          authorization: '{token}',
        },
      },
      functions: {
        deleteResources: ['token', 'sensorId'],
      },
    },
  ],
};

export default sensorDefinition;
