/* eslint-disable @typescript-eslint/no-explicit-any */
import {getModelSchemaRef} from '@loopback/openapi-v3';
// import {Request} from '@loopback/rest';
import * as fs from 'fs';
import {DeviceTopic, GeneralError, SensorTopic} from './models';
import {devicesApiEndPoint, sensorsApiEndPoint} from './services';

export const security = [
  {
    Authorization: [],
  },
];

export const defaultResponse = {
  description: 'Default http response',
  content: {
    'application/json': {
      schema: {'x-ts-type': GeneralError},
      // schema: {$ref: '#/components/schemas/GeneralError'},
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

export const sensorLinks = {
  measurements: {
    operationId: 'findSensorMeasurements',
    parameters: {
      sensorId: '$response.body#/id',
      filter: '$request.query.measurementFilter',
    },
  },
  resources: {
    operationId: 'findSensorResources',
    parameters: {
      sensorId: '$response.body#/id',
    },
  },
};

// const wildCardSelector = {
//   MQTT : '+',
//   EE: '*',
// }

// todo find a way to automatically update last segment based on the pubsub type
// wildcard -> MQTT : +, EventEmitter2 : *
const sensorCallbackExpression = `{$request.body#/ownerId}/${sensorsApiEndPoint}/{$method}/*`;
const deviceCallbackExpression = `{$request.body#/ownerId}/${devicesApiEndPoint}/{$method}/*`;

export const deviceCallbacks = {
  [deviceCallbackExpression]: {
    post: {
      operationId: 'devicesEventListener',
      description: 'Listen all devices events owned by ownerId',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              ...getModelSchemaRef(DeviceTopic).definitions.DeviceTopic,
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
};

export const sensorCallbacks = {
  [sensorCallbackExpression]: {
    post: {
      operationId: 'sensorsEventListener',
      description: 'Listen all sensors events owned by ownerId',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              ...getModelSchemaRef(SensorTopic).definitions.SensorTopic,
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Sensor instance',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Sensor',
                // 'x-ts-type': Sensor
              },
            },
          },
        },
      },
    },
  },
};

// export const getToken = (req: Request): string => {
export const getToken = (req: any): string => {
  return req.headers && req.headers.authorization
    ? req.headers.authorization
    : '';
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
