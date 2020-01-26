/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request} from '@loopback/rest';
import * as fs from 'fs';
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
  devicesCount: {
    operationId: 'findUserDevicesCount',
    parameters: {
      userId: '$response.body#/id',
    },
  },
  sensors: {
    operationId: 'findUserSensors',
    parameters: {
      userId: '$response.body#/id',
      filter: '$request.query.sensorFilter',
    },
  },
  sensorsCount: {
    operationId: 'findUserSensorsCount',
    parameters: {
      userId: '$response.body#/id',
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
  sensorsCount: {
    operationId: 'findDeviceSensorsCount',
    parameters: {
      deviceId: '$response.body#/id',
    },
  },
};

export const deviceEvents = {
  DevicesEvent: {
    '/api/{$request.body#/userName}/devices/{$request.body#/method}/+': {
      post: {
        operationId: 'devicesEventListener',
        description: 'Listen all devices events owned by userName',
        requestBody: {
          description: 'Device instance to update / create',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Device',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Device instance',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Device',
                },
              },
            },
          },
        },
      },
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

export const readFile = (filePath: string, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.readFile(filePath, opts, (err, data) =>
      err ? reject(err) : resolve(data),
    );
  });

export const writeFile = (filePath: string, data: any, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.appendFile(filePath, data, opts, err => (err ? reject(err) : resolve()));
  });

export const removeFile = (filePath: string) =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.unlink(filePath, err =>
      err && err.code !== 'ENOENT' ? reject(err) : resolve(),
    );
  });
/* eslint-enable @typescript-eslint/no-explicit-any */
