/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {inject} from '@loopback/context';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  Request,
  requestBody,
  RestBindings,
} from '@loopback/rest';
import {Device, DeviceAuthResponse, DeviceCredential, GeneralError} from '../models';
import {DeviceApi} from '../services';

const resource = 'devices';

const security = [
  {
    Authorization: [],
  },
];

const links = {
  sensors: {
    operationId: 'findSensors',
    parameters: {
      filter: {where: {deviceId: '$response.body#/id'}},
    },
  },
};

const defaultResponse = {
  description: 'Default http response',
  content: {
    'application/json': {
      schema: {'x-ts-type': GeneralError},
    },
  },
};

export class DeviceController {
  constructor(
    @inject('services.DeviceApi') protected deviceApi: DeviceApi,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @get(`/${resource}`, {
    operationId: 'findDevices',
    security,
    parameters: [
      {
        name: 'filter',
        in: 'query',
        description: 'User where filter',
        required: false,
        explode: true,
        style: 'deepObject',
        schema: getFilterSchemaFor(Device),
        // schema: {'x-ts-type': getFilterSchemaFor(Device)},
      },
    ],
    responses: {
      '200': {
        description: 'Array of Device model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {'x-ts-type': Device},
            },
          },
        },
      },
      default: defaultResponse,
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Device))
    filter?: Filter<Device>,
  ): Promise<Device[]> {
    console.log('find', this.request.headers);
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.deviceApi.find(token, 50, 0, filter);
  }

  @post(`/${resource}`, {
    operationId: 'createDevice',
    security,
    responses: {
      '200': {
        description: 'Device model instance',
        content: {'application/json': {schema: {'x-ts-type': Device}}},
      },
      default: defaultResponse,
    },
  })
  async create(@requestBody() device: Device): Promise<Device> {
    console.log('createDevice', this.request.headers);
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.deviceApi.create(token, device);
  }

  @get(`/${resource}/count`, {
    operationId: 'devicesCount',
    security,
    parameters: [
      {
        name: 'where',
        in: 'query',
        description: 'where filter',
        required: false,
        explode: true,
        style: 'deepObject',
        schema: getWhereSchemaFor(Device),
        // schema: {'x-ts-type': getWhereSchemaFor(Device)},
      },
    ],
    responses: {
      '200': {
        description: 'Device model count',
        content: {'application/json': {schema: CountSchema}},
      },
      default: defaultResponse,
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Device))
    where?: Where<Device>,
  ): Promise<Count> {
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.deviceApi.count(token, where);
  }

  @get(`/${resource}/{deviceId}`, {
    operationId: 'findDeviceById',
    security,
    parameters: [
      {
        name: 'deviceId',
        in: 'path',
        description: 'Device instance Id',
        required: true,
        schema: {
          type: 'string',
        },
        style: 'simple',
      },
    ],
    responses: {
      '200': {
        description: 'Device model instance',
        content: {'application/json': {schema: {'x-ts-type': Device}}},
        links,
      },
      default: defaultResponse,
    },
  })
  async findById(@param.path.string('deviceId') deviceId: string): Promise<Device> {
    console.log('findDeviceById', this.request.headers);
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.deviceApi.findById(token, deviceId);
  }

  @get(`/${resource}/findByOwner/{ownerId}`, {
    operationId: 'findDevicesByOwnerId',
    security,
    parameters: [
      {
        name: 'ownerId',
        in: 'path',
        description: 'Deviced owner Id',
        required: true,
        schema: {
          type: 'string',
        },
        style: 'simple',
      },
    ],
    responses: {
      '200': {
        description: 'Device model instance',
        content: {'application/json': {schema: {'x-ts-type': Device}}},
      },
      default: defaultResponse,
    },
  })
  async findByOwnerId(@param.path.string('ownerId') ownerId: string): Promise<Device[]> {
    console.log('findDeviceByOwnerId', this.request.headers);
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.deviceApi.find(token, 50, 0, {where: {ownerId: ownerId}});
  }

  @post(`/${resource}/authenticate`, {
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
  async auth(@requestBody() credentials: DeviceCredential): Promise<DeviceAuthResponse> {
    return this.deviceApi.authenticate(credentials);
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-explicit-any */
