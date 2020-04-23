// import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {Count, CountSchema, Filter, Where} from '@loopback/repository';
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
import {cache} from 'loopback-api-component';
import {callback} from 'loopback-callback-component';
import {Measurement, SensorResource, SensorResources, Sensor} from '../models';
import {SensorApi, sensorsApiEndPoint} from '../services';
import {defaultResponse, getToken, sensorLinks, security} from '../utils';

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
    @param.query.object('measurementFilter', getFilterSchemaFor(Measurement))
    measurementFilter?: Filter<Measurement>,
  ): Promise<Sensor[]> {
    const token = getToken(this.request);
    return this.sensorApi.find(token, filter);
  }

  @callback(
    'sensorWatcher',
    `{$response.body#/ownerId}/${sensorsApiEndPoint}/{$method}/{$response.body#/id}`,
    'post',
    {path: `/${sensorsApiEndPoint}`, method: 'post'},
  )
  @post(`/${sensorsApiEndPoint}`, {
    operationId: 'createSensor',
    security,
    requestBody: {
      description: 'Sensor instance to create',
      required: true,
      content: {
        'application/json': {
          schema: {
            'x-ts-type': Sensor,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Sensor instance',
        content: {'application/json': {schema: {'x-ts-type': Sensor}}},
      },
      default: defaultResponse,
    },
    callbacks: {
      sensorChange: {
        $ref: '#/components/callbacks/SensorEvents',
      },
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

  @cache(10)
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

  // @callback(
  //   'sensorWatcher',
  //   `{$response.body#/ownerId}/${sensorsApiEndPoint}/{$method}/{$response.body#/id}`,
  //   'patch',
  //   {path: `/${sensorsApiEndPoint}/{sensorId}`, method: 'patch'},
  // )
  @patch(`/${sensorsApiEndPoint}/{sensorId}`, {
    operationId: 'updateSensorById',
    security,
    requestBody: {
      description: 'Sensor instance to update',
      required: true,
      content: {
        'application/json': {
          schema: {
            'x-ts-type': Sensor,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Sensor instance',
        content: {'application/json': {schema: {'x-ts-type': Sensor}}},
      },
      default: defaultResponse,
    },
    callbacks: {
      sensorChange: {
        $ref: '#/components/callbacks/SensorEvents',
      },
    },
  })
  async updateById(
    @param.path.string('sensorId') sensorId: string,
    @requestBody() sensor: Sensor,
  ): Promise<Sensor> {
    const token = getToken(this.request);
    return this.sensorApi.updateById(token, sensorId, sensor);
  }

  // @callback(
  //   'sensorWatcher',
  //   `{$response.body#/ownerId}/${sensorsApiEndPoint}/{$method}/{$response.body#/id}`,
  //   'put',
  //   {path: `/${sensorsApiEndPoint}/{sensorId}`, method: 'put'},
  // )
  @put(`/${sensorsApiEndPoint}/{sensorId}`, {
    operationId: 'replaceSensorById',
    security,
    requestBody: {
      description: 'Sensor instance to update',
      required: true,
      content: {
        'application/json': {
          schema: {
            'x-ts-type': Sensor,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Sensor instance',
        content: {'application/json': {schema: {'x-ts-type': Sensor}}},
      },
      default: defaultResponse,
    },
    callbacks: {
      sensorChange: {
        $ref: '#/components/callbacks/SensorEvents',
      },
    },
  })
  async replaceById(
    @param.path.string('sensorId') sensorId: string,
    @requestBody() sensor: Sensor,
  ): Promise<Sensor> {
    const token = getToken(this.request);
    return this.sensorApi.replaceById(token, sensorId, sensor);
  }

  @del(`/${sensorsApiEndPoint}/{sensorId}`, {
    operationId: 'deleteSensorById',
    security,
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
      return null;
    }
    // return this.sensorApi.findMeasurements(token, sensorId, filter);
  }

  @cache(10)
  @get(`/${sensorsApiEndPoint}/{sensorId}/resources`, {
    operationId: 'findSensorResources',
    security,
    responses: {
      '200': {
        description: 'SensorResource collection',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': SensorResource,
            },
          },
        },
      },
      default: defaultResponse,
    },
  })
  async findResources(
    @param.path.string('sensorId') sensorId: string,
  ): Promise<SensorResources | null> {
    const token = getToken(this.request);
    return this.sensorApi.findResources(token, sensorId);
  }
}
