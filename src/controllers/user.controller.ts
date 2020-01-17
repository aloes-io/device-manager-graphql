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
import {AccessToken, GeneralError, User, UserCredential} from '../models';
import {UserApi} from '../services';

const resource = 'users';

const security = [
  {
    Authorization: [],
  },
];

const links = {
  devices: {
    // operationId: 'findDevices',
    operationId: 'findDevicesByOwnerId',
    parameters: {
      // filter: {where: {ownerId: '$response.body#/id'}},
      ownerId: '$response.body#/id',
    },
  },
  sensors: {
    operationId: 'findSensors',
    parameters: {
      filter: {where: {ownerId: '$response.body#/id'}},
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

export class UserController {
  constructor(
    @inject('services.UserApi') protected userApi: UserApi,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @get(`/${resource}`, {
    operationId: 'findUsers',
    security,
    parameters: [
      {
        name: 'filter',
        in: 'query',
        description: 'User where filter',
        required: false,
        explode: true,
        style: 'deepObject',
        schema: getFilterSchemaFor(User),
        //  schema: {'x-ts-type': getFilterSchemaFor(User)},
      },
    ],
    responses: {
      '200': {
        description: 'Array of User model instances',
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
    console.log('find', this.request.headers);
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.userApi.find(token, 50, 0, filter);
  }

  @post(`/${resource}`, {
    operationId: 'createUser',
    security,
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
      default: defaultResponse,
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    console.log('create', this.request.headers);
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.userApi.create(token, user);
  }

  @get(`/${resource}/count`, {
    operationId: 'usersCount',
    security,
    parameters: [
      {
        name: 'where',
        in: 'query',
        description: 'where filter',
        required: false,
        explode: true,
        style: 'deepObject',
        schema: getWhereSchemaFor(User),
        // schema: {'x-ts-type': getWhereSchemaFor(User)},
      },
    ],
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
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.userApi.count(token, where);
  }

  @get(`/${resource}/{userId}`, {
    operationId: 'findUserById',
    security,
    parameters: [
      {
        name: 'userId',
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
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
        links,
      },
      default: defaultResponse,
    },
  })
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    console.log('findById', this.request.headers);
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.userApi.findById(token, userId);
  }

  @post(`/${resource}/login`, {
    operationId: 'userLogin',
    responses: {
      '200': {
        description: 'User access token',
        content: {'application/json': {schema: {'x-ts-type': AccessToken}}},
      },
      default: defaultResponse,
    },
  })
  async login(@requestBody() credentials: UserCredential): Promise<AccessToken> {
    return this.userApi.login(credentials);
  }

  @post(`/${resource}/logout`, {
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
    console.log('logout', token, this.request.headers);
    return this.userApi.logout(token);
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-explicit-any */
