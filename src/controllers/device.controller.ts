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
import {cache} from 'loopback-api-cache';
// import merge from 'lodash.merge';
import {Device, DeviceAuthResponse, DeviceCredential, Measurement, Sensor} from '../models';
import {DeviceApi, devicesApiEndPoint} from '../services';
import {defaultResponse, deviceLinks, getToken, sensorLinks} from '../utils';

const security = [
  {
    Authorization: [],
  },
];

export class DeviceController {
  constructor(
    @inject('services.DeviceApi') protected deviceApi: DeviceApi,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @cache(10)
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
    responses: {
      '200': {
        description: 'Device instance',
        content: {'application/json': {schema: {'x-ts-type': Device}}},
      },
      default: defaultResponse,
    },
  })
  async create(@requestBody() device: Device): Promise<Device> {
    const token = getToken(this.request);
    return this.deviceApi.create(token, device);
  }

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

  @cache(20)
  @get(`/${devicesApiEndPoint}/{deviceId}`, {
    operationId: 'findDeviceById',
    security,
    responses: {
      '200': {
        description: 'Device instance',
        content: {'application/json': {schema: {'x-ts-type': Device}}},
        links: deviceLinks,
      },
      default: defaultResponse,
    },
  })
  async findById(
    @param.path.string('deviceId') deviceId: string,
    @param.query.object('sensorFilter', getFilterSchemaFor(Sensor)) sensorFilter?: Filter<Sensor>,
  ): Promise<Device> {
    const token = getToken(this.request);
    return this.deviceApi.findById(token, deviceId);
  }

  @cache(15)
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
              items: {'x-ts-type': Sensor},
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
    @param.query.object('filter', getFilterSchemaFor(Sensor)) filter?: Filter<Sensor>,
    @param.query.object('measurementFilter', getFilterSchemaFor(Measurement))
    measurementFilter?: Filter<Measurement>,
  ): Promise<Sensor[]> {
    const token = getToken(this.request);
    return this.deviceApi.findSensors(token, deviceId, filter);
  }

  // @cache(20)
  // @get(`/${devicesApiEndPoint}/findByOwner/{ownerId}`, {
  //   operationId: 'findDevicesByOwnerId',
  //   security,
  //   responses: {
  //     '200': {
  //       description: 'Device collection',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'array',
  //             items: {'x-ts-type': Device},
  //           },
  //         },
  //       },
  //       links,
  //     },
  //     default: defaultResponse,
  //   },
  // })
  // async findByOwnerId(
  //   @param.path.string('ownerId') ownerId: string,
  //   @param.query.object('filter', getFilterSchemaFor(Device)) filter?: Filter<Device>,
  //   @param.query.object('sensorFilter', getFilterSchemaFor(Sensor)) sensorFilter?: Filter<Sensor>,
  // ): Promise<Device[]> {
  //   const token = getToken(this.request);
  //   const whereFilter = {where: {ownerId}};
  //   // console.log('findDevicesByOwnerId whereFilter', filter, whereFilter);
  //   return this.deviceApi.find(token, filter ? merge(filter, whereFilter) : whereFilter);
  // }

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
  async auth(@requestBody() credentials: DeviceCredential): Promise<DeviceAuthResponse> {
    return this.deviceApi.authenticate(credentials);
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-explicit-any */
