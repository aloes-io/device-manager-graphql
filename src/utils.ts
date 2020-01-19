import {Request} from '@loopback/rest';
import {GeneralError} from './models';

export const defaultResponse = {
  description: 'Default http response',
  content: {
    'application/json': {
      schema: {'x-ts-type': GeneralError},
    },
  },
};

export const userLinks = {
  devices: {
    operationId: 'findUserDevices',
    parameters: {
      userId: '$response.body#/id',
      filter: '$request.query.deviceFilter',
    },
  },
  sensors: {
    operationId: 'findUserSensors',
    parameters: {
      userId: '$response.body#/id',
      filter: '$request.query.sensorFilter',
    },
  },
};

export const deviceLinks = {
  sensors: {
    operationId: 'findDeviceSensors',
    parameters: {
      deviceId: '$response.body#/id',
      filter: '$request.query.sensorFilter',
    },
  },
};

export const sensorLinks = {
  measurements: {
    operationId: 'findSensorMeasurements',
    parameters: {
      sensorId: '$response.body#/id',
      filter: '$request.query.measurementFilter',
    },
  },
};

export const getToken = (req: Request): string => {
  return req.headers.authorization ? req.headers.authorization : '';
};
