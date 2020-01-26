/* eslint-disable @typescript-eslint/no-unused-vars */
// import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
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
import {callback} from 'loopback-pubsub-component';
import {Measurement, Sensor} from '../models';
import {SensorApi, sensorsApiEndPoint} from '../services';
import {defaultResponse, getToken, sensorLinks} from '../utils';

const security = [
  {
    Authorization: [],
  },
];

export class SensorController {
  constructor(
    @inject('services.SensorApi') protected sensorApi: SensorApi,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  // @authorize('jwt')
  @cache(20)
  @get(`/${sensorsApiEndPoint}`, {
    operationId: 'findSensors',
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
  async find(
    @param.query.object('filter', getFilterSchemaFor(Sensor))
    filter?: Filter<Sensor>,
  ): Promise<Sensor[]> {
    const token = getToken(this.request);
    return this.sensorApi.find(token, filter);
  }

  @post(`/${sensorsApiEndPoint}`, {
    operationId: 'createSensor',
    security,
    responses: {
      '200': {
        description: 'Sensor instance',
        content: {'application/json': {schema: {'x-ts-type': Sensor}}},
      },
      default: defaultResponse,
    },
  })
  async create(@requestBody() device: Sensor): Promise<Sensor> {
    const token = getToken(this.request);
    return this.sensorApi.create(token, device);
  }

  @cache(20)
  @get(`/${sensorsApiEndPoint}/count`, {
    operationId: 'sensorsCount',
    security,
    responses: {
      '200': {
        description: 'Sensors count',
        content: {'application/json': {schema: CountSchema}},
      },
      default: defaultResponse,
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Sensor))
    where?: Where<Sensor>,
  ): Promise<Count> {
    const token = getToken(this.request);
    return this.sensorApi.count(token, where);
  }

  @cache(20)
  @get(`/${sensorsApiEndPoint}/{sensorId}`, {
    operationId: 'findSensorById',
    security,
    responses: {
      '200': {
        description: 'Sensor instance',
        content: {'application/json': {schema: {'x-ts-type': Sensor}}},
        links: sensorLinks,
      },
      default: defaultResponse,
    },
  })
  async findById(
    @param.path.string('sensorId') sensorId: string,
    @param.query.object('measurementFilter', getFilterSchemaFor(Measurement))
    filter?: Filter<Measurement>,
  ): Promise<Sensor> {
    const token = getToken(this.request);
    return this.sensorApi.findById(token, sensorId);
  }

  @callback(`/${sensorsApiEndPoint}`, 'put')
  @patch(`/${sensorsApiEndPoint}/{sensorId}`, {
    operationId: 'updateSensorById',
    security,
    responses: {
      '200': {
        description: 'Sensor instance',
        content: {'application/json': {schema: {'x-ts-type': Sensor}}},
      },
      default: defaultResponse,
    },
    // callbacks
  })
  async updateById(
    @param.path.string('sensorId') sensorId: string,
    @requestBody() sensor: Sensor,
  ): Promise<Sensor> {
    const token = getToken(this.request);
    return this.sensorApi.updateById(token, sensorId, sensor);
  }

  @callback(`/${sensorsApiEndPoint}`, 'put')
  @put(`/${sensorsApiEndPoint}/{sensorId}`, {
    operationId: 'replaceSensorById',
    security,
    responses: {
      '200': {
        description: 'Sensor instance',
        content: {'application/json': {schema: {'x-ts-type': Sensor}}},
      },
      default: defaultResponse,
    },
    // callbacks
  })
  async replaceById(
    @param.path.string('sensorId') sensorId: string,
    @requestBody() sensor: Sensor,
  ): Promise<Sensor> {
    const token = getToken(this.request);
    return this.sensorApi.replaceById(token, sensorId, sensor);
  }

  @callback(`/${sensorsApiEndPoint}`, 'delete')
  @del(`/${sensorsApiEndPoint}/{sensorId}`, {
    operationId: 'deleteSensorById',
    security,
    responses: {
      default: defaultResponse,
    },
  })
  async deleteById(
    @param.path.string('sensorId') sensorId: string,
  ): Promise<{id: string}> {
    const token = getToken(this.request);
    return this.sensorApi.deleteById(token, sensorId);
  }

  @cache(10)
  @get(`/${sensorsApiEndPoint}/{sensorId}/measurements`, {
    operationId: 'findSensorMeasurements',
    security,
    responses: {
      '200': {
        description: 'Measurement collection',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {'x-ts-type': Measurement},
            },
          },
        },
      },
      default: defaultResponse,
    },
  })
  async findMeasurements(
    @param.path.string('sensorId') sensorId: string,
    @param.query.object('filter', getFilterSchemaFor(Measurement))
    filter?: Filter<Measurement>,
  ): Promise<Measurement[] | null> {
    const token = getToken(this.request);
    try {
      const measurements = await this.sensorApi.findMeasurements(
        token,
        sensorId,
        filter,
      );
      return measurements;
    } catch (e) {
      console.log('FIND MEASUREMENTS: ERR', e);
      return null;
    }
    // return this.sensorApi.findMeasurements(token, sensorId, filter);
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
