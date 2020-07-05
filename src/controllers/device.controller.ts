import {inject} from '@loopback/context';
import {Count, CountSchema, Filter, Where} from '@loopback/repository';
import {
  // api,
  patch,
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  put,
  del,
  Request,
  requestBody,
  RestBindings,
} from '@loopback/rest';
import {cache} from 'loopback-api-component';
// import {api as deviceApi} from './device.controller.api';
import {
  Device,
  DeviceAuthResponse,
  DeviceCredential,
  Measurement,
  Sensor,
} from '../models';
import {DeviceApi, devicesApiEndPoint} from '../services';
import {
  defaultResponse,
  deviceLinks,
  getToken,
  sensorLinks,
  security,
} from '../utils';

// @api(deviceApi)
export class DeviceController {
  constructor(
    @inject('services.DeviceApi') protected deviceApi: DeviceApi,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @cache(30)
  @get(`/${devicesApiEndPoint}`, {
    operationId: 'findDevices',
    security,
    responses: {
      '200': {
        description: 'Device collection',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {'x-ts-type': Device},
            },
          },
        },
        links: deviceLinks,
      },
      default: defaultResponse,
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Device))
    filter?: Filter<Device>,
  ): Promise<Device[]> {
    const token = getToken(this.request);
    return this.deviceApi.find(token, filter);
  }

  @post(`/${devicesApiEndPoint}`, {
    operationId: 'createDevice',
    security,
    requestBody: {
      description: 'Device instance to create',
      required: true,
      content: {
        'application/json': {
          schema: {
            'x-ts-type': Device,
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
              'x-ts-type': Device,
            },
          },
        },
      },
      default: defaultResponse,
    },
    callbacks: {
      deviceChange: {
        $ref: '#/components/callbacks/DeviceEvents',
      },
    },
  })
  async create(@requestBody() device: Device): Promise<Device> {
    const token = getToken(this.request);
    return this.deviceApi.create(token, device);
  }

  @cache(30)
  @get(`/${devicesApiEndPoint}/count`, {
    operationId: 'devicesCount',
    security,
    responses: {
      '200': {
        description: 'Devices count',
        content: {'application/json': {schema: CountSchema}},
      },
      default: defaultResponse,
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Device))
    where?: Where<Device>,
  ): Promise<Count> {
    const token = getToken(this.request);
    return this.deviceApi.count(token, where);
  }

  @cache(30)
  @get(`/${devicesApiEndPoint}/{deviceId}`, {
    operationId: 'findDeviceById',
    security,
    responses: {
      '200': {
        description: 'Device instance',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': Device,
            },
          },
        },
        links: deviceLinks,
      },
      default: defaultResponse,
    },
  })
  async findById(
    @param.path.string('deviceId') deviceId: string,
    @param.query.object('sensorFilter', getFilterSchemaFor(Sensor))
    sensorFilter?: Filter<Sensor>,
  ): Promise<Device> {
    const token = getToken(this.request);
    return this.deviceApi.findById(token, deviceId);
  }

  @patch(`/${devicesApiEndPoint}/{deviceId}`, {
    operationId: 'updateDeviceById',
    security,
    responses: {
      '200': {
        description: 'Device instance',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': Device,
            },
          },
        },
        links: deviceLinks,
      },
      default: defaultResponse,
    },
    callbacks: {
      deviceChange: {
        $ref: '#/components/callbacks/DeviceEvents',
      },
    },
  })
  async updateById(
    @param.path.string('deviceId') deviceId: string,
    @requestBody() device: Device | Partial<Device>,
  ): Promise<Device> {
    const token = getToken(this.request);
    return this.deviceApi.updateById(token, deviceId, device);
  }

  @put(`/${devicesApiEndPoint}/{deviceId}`, {
    operationId: 'replaceDeviceById',
    security,
    responses: {
      '200': {
        description: 'Device instance',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': Device,
            },
          },
        },
        links: deviceLinks,
      },
      default: defaultResponse,
    },
    callbacks: {
      deviceChange: {
        $ref: '#/components/callbacks/DeviceEvents',
      },
    },
  })
  async replaceById(
    @param.path.string('deviceId') deviceId: string,
    @requestBody() device: Device,
  ): Promise<Device> {
    const token = getToken(this.request);
    return this.deviceApi.replaceById(token, deviceId, device);
  }

  @del(`/${devicesApiEndPoint}/{deviceId}`, {
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
  })
  async deleteById(
    @param.path.string('deviceId') deviceId: string,
  ): Promise<{id: string}> {
    const token = getToken(this.request);
    return this.deviceApi.deleteById(token, deviceId);
  }

  @cache(30)
  @get(`/${devicesApiEndPoint}/{deviceId}/sensors`, {
    operationId: 'findDeviceSensors',
    security,
    responses: {
      '200': {
        description: 'Sensor collection',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': Sensor,
              },
            },
          },
        },
        links: sensorLinks,
      },
      default: defaultResponse,
    },
  })
  async findSensors(
    @param.path.string('deviceId') deviceId: string,
    @param.query.object('filter', getFilterSchemaFor(Sensor))
    filter?: Filter<Sensor>,
    @param.query.object('measurementFilter', getFilterSchemaFor(Measurement))
    measurementFilter?: Filter<Measurement>,
  ): Promise<Sensor[] | null> {
    const token = getToken(this.request);
    return this.deviceApi.findSensors(token, deviceId, filter);
  }

  @cache(30)
  @get(`/${devicesApiEndPoint}/{deviceId}/sensors/count`, {
    operationId: 'findDeviceSensorsCount',
    security,
    responses: {
      '200': {
        description: 'Sensors count',
        content: {'application/json': {schema: CountSchema}},
      },
      default: defaultResponse,
    },
  })
  async findSensorsCount(
    @param.path.string('deviceId') deviceId: string,
    @param.query.object('where', getWhereSchemaFor(Sensor))
    where?: Where<Sensor>,
  ): Promise<Count> {
    const token = getToken(this.request);
    return this.deviceApi.findSensorsCount(token, deviceId, where);
  }

  @post(`/${devicesApiEndPoint}/authenticate`, {
    operationId: 'deviceAuthenticate',
    responses: {
      '200': {
        description: 'Device and key type',
        content: {
          'application/json': {
            schema: {'x-ts-type': DeviceAuthResponse},
          },
        },
      },
    },
  })
  async auth(
    @requestBody() credentials: DeviceCredential,
  ): Promise<DeviceAuthResponse> {
    return this.deviceApi.authenticate(credentials);
  }
}
