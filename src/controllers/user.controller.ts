/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {inject} from '@loopback/context';
import {Count, CountSchema, Filter, Where} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  put,
  Request,
  requestBody,
  RestBindings,
} from '@loopback/rest';
import {cache} from 'loopback-api-component';
import {
  AccessToken,
  Device,
  Measurement,
  Sensor,
  User,
  UserCredential,
} from '../models';
import {UserApi, usersApiEndPoint} from '../services';
import {
  defaultResponse,
  deviceLinks,
  getToken,
  userLinks,
  sensorLinks,
  security,
} from '../utils';

export class UserController {
  constructor(
    @inject('services.UserApi') protected userApi: UserApi,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @get(`/${usersApiEndPoint}`, {
    operationId: 'findUsers',
    security,
    responses: {
      '200': {
        description: 'User collection',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {'x-ts-type': User},
            },
          },
        },
      },
      default: defaultResponse,
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User))
    filter?: Filter<User>,
  ): Promise<User[]> {
    const token = getToken(this.request);
    return this.userApi.find(token, filter);
  }

  @post(`/${usersApiEndPoint}`, {
    operationId: 'createUser',
    security,
    responses: {
      '200': {
        description: 'User instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
      default: defaultResponse,
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    const token = getToken(this.request);
    return this.userApi.create(token, user);
  }

  @get(`/${usersApiEndPoint}/count`, {
    operationId: 'usersCount',
    security,
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
      default: defaultResponse,
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User))
    where?: Where<User>,
  ): Promise<Count> {
    const token = getToken(this.request);
    return this.userApi.count(token, where);
  }

  @cache(60)
  @get(`/${usersApiEndPoint}/{userId}`, {
    operationId: 'findUserById',
    security,
    responses: {
      '200': {
        description: 'User instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
        links: userLinks,
      },
      default: defaultResponse,
    },
  })
  async findById(
    @param.path.string('userId') userId: string,
    @param.query.object('deviceFilter', getFilterSchemaFor(Device))
    deviceFilter?: Filter<Device>,
    @param.query.object('sensorFilter', getFilterSchemaFor(Sensor))
    sensorFilter?: Filter<Sensor>,
    @param.query.object('measurementFilter', getFilterSchemaFor(Measurement))
    measurementFilter?: Filter<Measurement>,
  ): Promise<User> {
    const token = getToken(this.request);
    return this.userApi.findById(token, userId);
  }

  @cache(30)
  @get(`/${usersApiEndPoint}/{userId}/devices`, {
    operationId: 'findUserDevices',
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
  async findDevices(
    @param.path.string('userId') userId: string,
    @param.query.object('filter', getFilterSchemaFor(Device))
    filter?: Filter<Device>,
    @param.query.object('sensorFilter', getFilterSchemaFor(Sensor))
    sensorFilter?: Filter<Sensor>,
    @param.query.object('measurementFilter', getFilterSchemaFor(Measurement))
    measurementFilter?: Filter<Measurement>,
  ): Promise<Device[]> {
    const token = getToken(this.request);
    return this.userApi.findDevices(token, userId, filter);
  }

  @cache(30)
  @get(`/${usersApiEndPoint}/{userId}/devices/count`, {
    operationId: 'findUserDevicesCount',
    security,
    responses: {
      '200': {
        description: 'Devices count',
        content: {'application/json': {schema: CountSchema}},
      },
      default: defaultResponse,
    },
  })
  async findDevicesCount(
    @param.path.string('userId') userId: string,
    @param.query.object('where', getWhereSchemaFor(Device))
    where?: Where<Device>,
  ): Promise<Count> {
    const token = getToken(this.request);
    return this.userApi.findDevicesCount(token, userId, where);
  }

  @cache(20)
  @get(`/${usersApiEndPoint}/{userId}/sensors`, {
    operationId: 'findUserSensors',
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
    @param.path.string('userId') userId: string,
    @param.query.object('filter', getFilterSchemaFor(Sensor))
    filter?: Filter<Sensor>,
  ): Promise<Sensor[]> {
    const token = getToken(this.request);
    return this.userApi.findSensors(token, userId, filter);
  }

  @cache(20)
  @get(`/${usersApiEndPoint}/{userId}/sensors/count`, {
    operationId: 'findUserSensorsCount',
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
    @param.path.string('userId') userId: string,
    @param.query.object('where', getWhereSchemaFor(Sensor))
    where?: Where<Sensor>,
  ): Promise<Count> {
    const token = getToken(this.request);
    return this.userApi.findSensorsCount(token, userId, where);
  }

  @post(`/${usersApiEndPoint}/login`, {
    operationId: 'userLogin',
    responses: {
      '200': {
        description: 'User access token',
        content: {'application/json': {schema: {'x-ts-type': AccessToken}}},
      },
      default: defaultResponse,
    },
  })
  async login(
    @requestBody() credentials: UserCredential,
  ): Promise<AccessToken> {
    return this.userApi.login(credentials);
  }

  @post(`/${usersApiEndPoint}/logout`, {
    operationId: 'userLogout',
    responses: {
      '204': {
        description: 'User logout success',
        // content: {'application/json': {schema: {'x-ts-type': User}}},
      },
      default: defaultResponse,
    },
  })
  async logout(@requestBody() token: AccessToken): Promise<any> {
    return this.userApi.logout(token);
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-explicit-any */
