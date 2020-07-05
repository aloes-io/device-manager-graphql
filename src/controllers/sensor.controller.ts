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
import {
  Measurement,
  SensorResources,
  Sensor,
  Accelerometer,
  Acidity,
  Actuation,
  AddressableTextDisplay,
  Altitude,
  AnalogOutput,
  AnalogInput,
  AudioClip,
  Barometer,
  Bitmap,
  Buzzer,
  CellBlacklistEvent,
  CellReselectionEvent,
  Color,
  Concentration,
  Conductivity,
  Current,
  Depth,
  DigitalInput,
  DigitalOutput,
  Direction,
  Distance,
  Energy,
  Frequency,
  GenericSensor,
  GpsLocation,
  Gyrometer,
  HandoverEvent,
  HumiditySensor,
  IlluminanceSensor,
  LevelControl,
  LightControl,
  LoadControl,
  Load,
  Loudness,
  Magnetometer,
  MultipleAxisJoystick,
  MultistateSelector,
  OnOffSwitch,
  Percentage,
  PlmnSearchEvent,
  Positioner,
  PowerControl,
  PowerFactor,
  PowerMeasurment,
  Power,
  PowerupLog,
  PresenceSensor,
  Pressure,
  PushButton,
  RadioLinkFailureEvent,
  Rate,
  SetPoint,
  Stopwatch,
  TemperatureSensor,
  Time,
  Timer,
  UpDownControl,
  Voltage,
} from '../models';
import {SensorApi, sensorsApiEndPoint} from '../services';
import {defaultResponse, getToken, sensorLinks, security} from '../utils';

export class SensorController {
  constructor(
    @inject('services.SensorApi') protected sensorApi: SensorApi,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  // @authorize('jwt')
  @cache(30)
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

  @cache(30)
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

  @cache(30)
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
    @requestBody() sensor: Sensor | Partial<Sensor>,
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
              oneOf: [
                {'x-ts-type': Accelerometer},
                {'x-ts-type': Acidity},
                {'x-ts-type': Actuation},
                {'x-ts-type': AddressableTextDisplay},
                {'x-ts-type': Altitude},
                {'x-ts-type': AnalogInput},
                {'x-ts-type': AnalogOutput},
                {'x-ts-type': AudioClip},
                {'x-ts-type': Barometer},
                {'x-ts-type': Bitmap},
                {'x-ts-type': Buzzer},
                {'x-ts-type': CellBlacklistEvent},
                {'x-ts-type': CellReselectionEvent},
                {'x-ts-type': Color},
                {'x-ts-type': Concentration},
                {'x-ts-type': Conductivity},
                {'x-ts-type': Current},
                {'x-ts-type': Depth},
                {'x-ts-type': DigitalInput},
                {'x-ts-type': DigitalOutput},
                {'x-ts-type': Direction},
                {'x-ts-type': Distance},
                {'x-ts-type': Energy},
                {'x-ts-type': Frequency},
                {'x-ts-type': GenericSensor},
                {'x-ts-type': GpsLocation},
                {'x-ts-type': Gyrometer},
                {'x-ts-type': HandoverEvent},
                {'x-ts-type': HumiditySensor},
                {'x-ts-type': IlluminanceSensor},
                {'x-ts-type': LevelControl},
                {'x-ts-type': LightControl},
                {'x-ts-type': LoadControl},
                {'x-ts-type': Load},
                {'x-ts-type': Loudness},
                {'x-ts-type': Magnetometer},
                {'x-ts-type': MultipleAxisJoystick},
                {'x-ts-type': MultistateSelector},
                {'x-ts-type': OnOffSwitch},
                {'x-ts-type': Percentage},
                {'x-ts-type': PlmnSearchEvent},
                {'x-ts-type': Positioner},
                {'x-ts-type': PowerControl},
                {'x-ts-type': PowerFactor},
                {'x-ts-type': PowerMeasurment},
                {'x-ts-type': Power},
                {'x-ts-type': PowerupLog},
                {'x-ts-type': PresenceSensor},
                {'x-ts-type': Pressure},
                {'x-ts-type': PushButton},
                {'x-ts-type': RadioLinkFailureEvent},
                {'x-ts-type': Rate},
                {'x-ts-type': SetPoint},
                {'x-ts-type': Stopwatch},
                {'x-ts-type': TemperatureSensor},
                {'x-ts-type': Time},
                {'x-ts-type': Timer},
                {'x-ts-type': UpDownControl},
                {'x-ts-type': Voltage},
              ],
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
