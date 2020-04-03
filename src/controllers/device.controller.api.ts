import {getModelSchemaRef} from '@loopback/openapi-v3';
import {CountSchema} from '@loopback/repository';
import {getFilterSchemaFor, getWhereSchemaFor} from '@loopback/rest';
import {
  Device,
  DeviceTopic,
  Measurement,
  Sensor,
  GeneralError,
} from '../models';
import {devicesApiEndPoint} from '../services';
import {
  defaultResponse,
  deviceLinks,
  deviceCallbacks,
  sensorLinks,
  security,
} from '../utils';

export const api = {
  paths: {
    [`/${devicesApiEndPoint}`]: {
      get: {
        'x-operation-name': 'find',
        'x-controller-name': 'DeviceController',
        operationId: 'findDevices',
        security,
        responses: {
          '200': {
            description: 'Device collection',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {$ref: '#/components/schemas/Device'},
                  // items: {'x-ts-type': Device},
                },
              },
            },
            links: deviceLinks,
          },
          default: defaultResponse,
        },
      },
      post: {
        'x-operation-name': 'create',
        'x-controller-name': 'DeviceController',
        operationId: 'createDevice',
        security,
        requestBody: {
          description: 'Device instance to create',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Device',
                // 'x-ts-type': Device,
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
                  // 'x-ts-type': Device
                },
              },
            },
          },
          default: defaultResponse,
        },
        callbacks: {
          deviceCallbacks,
        },
      },
    },
    [`/${devicesApiEndPoint}/count`]: {
      get: {
        'x-operation-name': 'count',
        'x-controller-name': 'DeviceController',
        operationId: 'devicesCount',
        security,
        responses: {
          '200': {
            description: 'Devices count',
            content: {'application/json': {schema: CountSchema}},
          },
          default: defaultResponse,
        },
      },
    },
    [`/${devicesApiEndPoint}/{deviceId}`]: {
      get: {
        'x-operation-name': 'findById',
        'x-controller-name': 'DeviceController',
        operationId: 'findDeviceById',
        security,
        parameters: [
          {
            name: 'deviceId',
            in: 'path',
            required: true,
            schema: {type: 'string'},
          },
        ],
        responses: {
          '200': {
            description: 'Device instance',
            content: {
              'application/json': {
                schema: {$ref: '#/components/schemas/Device'},
                // {'x-ts-type': Device}
              },
            },
            links: deviceLinks,
          },
          default: defaultResponse,
        },
      },
      put: {
        'x-operation-name': 'replaceById',
        'x-controller-name': 'DeviceController',
        operationId: 'replaceDeviceById',
        security,
        parameters: [
          {
            name: 'deviceId',
            in: 'path',
            required: true,
            schema: {type: 'string'},
          },
        ],
        requestBody: {
          description: 'Device instance to replace',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Device',
                // 'x-ts-type': Device,
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
                  //'x-ts-type': Device
                  $ref: '#/components/schemas/Device',
                },
              },
            },
          },
          default: defaultResponse,
        },
        // callbacks: deviceCallbacks,
      },
      delete: {
        'x-operation-name': 'deleteById',
        'x-controller-name': 'DeviceController',
        operationId: 'deleteDeviceById',
        security,
        parameters: [
          {
            name: 'deviceId',
            in: 'path',
            required: true,
            schema: {type: 'string'},
          },
        ],
        responses: {
          '200': {
            description: 'Count of instance deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    count: {
                      type: 'number',
                      description: 'Number of instance deleted',
                    },
                  },
                },
              },
            },
          },
          default: defaultResponse,
        },
      },
    },
    [`/${devicesApiEndPoint}/{deviceId}/sensors`]: {
      get: {
        'x-operation-name': 'findSensors',
        'x-controller-name': 'DeviceController',
        operationId: 'findDeviceSensors',
        security,
        parameters: [
          {
            name: 'deviceId',
            in: 'path',
            required: true,
            schema: {type: 'string'},
          },
          {
            name: 'filter',
            in: 'query',
            schema: getFilterSchemaFor(Sensor),
          },
          {
            name: 'measurementFilter',
            in: 'query',
            schema: getFilterSchemaFor(Measurement),
          },
        ],
        responses: {
          '200': {
            description: 'Sensor collection',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Sensor',
                    // 'x-ts-type': Sensor
                  },
                },
              },
            },
            links: sensorLinks,
          },
          default: defaultResponse,
        },
      },
    },
    [`/${devicesApiEndPoint}/{deviceId}/sensors/count`]: {
      get: {
        'x-operation-name': 'findSensorsCount',
        'x-controller-name': 'DeviceController',
        operationId: 'findDeviceSensorsCount',
        security,
        parameters: [
          {
            name: 'deviceId',
            in: 'path',
            required: true,
            schema: {type: 'string'},
          },
          {
            name: 'where',
            in: 'query',
            schema: getWhereSchemaFor(Sensor),
          },
        ],
        responses: {
          '200': {
            description: 'Sensors count',
            content: {'application/json': {schema: CountSchema}},
          },
          default: defaultResponse,
        },
      },
    },
  },
  components: {
    schemas: {
      ...getModelSchemaRef(Device).definitions,
      ...getModelSchemaRef(DeviceTopic).definitions,
      ...getModelSchemaRef(GeneralError).definitions,
      ...getModelSchemaRef(Sensor).definitions,
      ...getModelSchemaRef(Measurement).definitions,
    },
    // callbacks: {},
  },
};
