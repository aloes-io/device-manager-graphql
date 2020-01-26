/* eslint-disable @typescript-eslint/no-unused-vars */

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
import {Measurement} from '../models';
import {MeasurementApi, measurementsApiEndPoint} from '../services';
import {defaultResponse, getToken} from '../utils';

const security = [
  {
    Authorization: [],
  },
];

export class MeasurementController {
  constructor(
    @inject('services.MeasurementApi') protected measurementApi: MeasurementApi,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @cache(10)
  @get(`/${measurementsApiEndPoint}`, {
    operationId: 'findMeasurements',
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
  async find(
    @param.query.object('filter', getFilterSchemaFor(Measurement))
    filter?: Filter<Measurement>,
  ): Promise<Measurement[] | null> {
    const token = getToken(this.request);
    try {
      const measurements = await this.measurementApi.find(token, filter);
      return measurements;
    } catch (e) {
      console.log('FIND MEASUREMENTS: ERR', e);
      return null;
    }
    // return this.measurementApi.find(token, filter);
  }

  @cache(30)
  @get(`/${measurementsApiEndPoint}/{measurementId}`, {
    operationId: 'findMeasurementsById',
    security,
    responses: {
      '200': {
        description: 'Measurement instance',
        content: {'application/json': {schema: {'x-ts-type': Measurement}}},
      },
      default: defaultResponse,
    },
  })
  async findById(
    @param.path.string('measurementId') measurementId: string,
  ): Promise<Measurement> {
    const token = getToken(this.request);
    return this.measurementApi.findById(token, measurementId);
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
