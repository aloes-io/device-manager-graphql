/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import {authorize} from '@loopback/authorization';
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
import {Sensor, GeneralError} from '../models';
import {SensorApi} from '../services';

const resource = 'sensors';

const security = [
  {
    Authorization: [],
  },
];

// const links = {
//   measurements: {
//     operationId: 'findMeasurement',
//     parameters: {
//       filter: {where: {sensorId: '$response.body#/id'}},
//     },
//   },
// };

const defaultResponse = {
  description: 'Default http response',
  content: {
    'application/json': {
      schema: {'x-ts-type': GeneralError},
    },
  },
};

export class SensorController {
  constructor(
    @inject('services.SensorApi') protected sensorApi: SensorApi,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  // @authorize('jwt')
  @get(`/${resource}`, {
    operationId: 'findSensors',
    security,
    parameters: [
      {
        name: 'filter',
        in: 'query',
        description: 'User where filter',
        required: false,
        explode: true,
        style: 'deepObject',
        schema: getFilterSchemaFor(Sensor),
        // schema: {'x-ts-type': getFilterSchemaFor(Sensor)},
      },
    ],
    responses: {
      '200': {
        description: 'Array of Sensor model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {'x-ts-type': Sensor},
            },
          },
        },
      },
      default: defaultResponse,
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Sensor))
    filter?: Filter<Sensor>,
  ): Promise<Sensor[]> {
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.sensorApi.find(token, 50, 0, filter);
  }

  @post(`/${resource}`, {
    operationId: 'createSensor',
    security,
    responses: {
      '200': {
        description: 'Sensor model instance',
        content: {'application/json': {schema: {'x-ts-type': Sensor}}},
      },
      default: defaultResponse,
    },
  })
  async create(@requestBody() device: Sensor): Promise<Sensor> {
    console.log('createSensor', this.request.headers);
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.sensorApi.create(token, device);
  }

  @get(`/${resource}/count`, {
    operationId: 'sensorsCount',
    security,
    parameters: [
      {
        name: 'where',
        in: 'query',
        description: 'where filter',
        required: false,
        explode: true,
        style: 'deepObject',
        schema: getWhereSchemaFor(Sensor),
        // schema: {'x-ts-type': getWhereSchemaFor(Sensor)},
      },
    ],
    responses: {
      '200': {
        description: 'Sensor model count',
        content: {'application/json': {schema: CountSchema}},
      },
      default: defaultResponse,
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Sensor))
    where?: Where<Sensor>,
  ): Promise<Count> {
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.sensorApi.count(token, where);
  }

  @get(`/${resource}/{sensorId}`, {
    operationId: 'findSensorById',
    security,
    parameters: [
      {
        name: 'sensorId',
        in: 'path',
        description: 'sensor instance Id',
        required: true,
        schema: {
          type: 'string',
        },
        style: 'simple',
      },
    ],
    responses: {
      '200': {
        description: 'Sensor model instance',
        content: {'application/json': {schema: {'x-ts-type': Sensor}}},
        // links,
      },
      default: defaultResponse,
    },
  })
  async findById(@param.path.string('sensorId') sensorId: string): Promise<Sensor> {
    console.log('findSensorById', this.request.headers);
    const token: string = this.request.headers.authorization
      ? this.request.headers.authorization
      : '';
    return this.sensorApi.findById(token, sensorId);
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-explicit-any */
