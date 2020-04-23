/* eslint-disable @typescript-eslint/no-explicit-any */
import {ValueObject, model, property} from '@loopback/repository';
import {
  OMAResources,
  Accelerometer,
  Acidity,
  Actuation,
  AddressableTextDisplay,
  Altitude,
  AnalogInput,
  AnalogOutput,
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
  LightControl,
  Load,
  LevelControl,
  LoadControl,
  Loudness,
  Magnetometer,
  MultipleAxisJoystick,
  MultistateSelector,
  OnOffSwitch,
  Percentage,
  PlmnSearchEvent,
  Positioner,
  Power,
  PowerControl,
  PowerFactor,
  PowerMeasurment,
  PowerupLog,
  PresenceSensor,
  Pressure,
  PushButton,
  RadioLinkFailureEvent,
  Rate,
  RrcStateChangeEvent,
  RrcTimerExpiryEvent,
  ScellId,
  SetPoint,
  Stopwatch,
  TemperatureSensor,
  Time,
  Timer,
  UpDownControl,
  Voltage,
} from 'oma-json';

@model()
export class SensorResource extends ValueObject implements OMAResources {
  /**
   * The tool version that the device supports - used to determine the logging object/resource version to be used for parsing
   */
  @property()
  '1'?: string;
  /**
   * IMEI of device
   */
  @property()
  '2'?: string;
  /**
   * IMSI of device
   */
  @property()
  '3'?: string;
  /**
   * MSISDN of device
   */
  @property()
  '4'?: string;
  /**
   * Human-readable name of the device
   */
  @property()
  '10'?: string;
  /**
   * The current state of a digital input.
   */
  @property()
  '5500'?: boolean;
  /**
   * The cumulative value of active state detected.
   */
  @property()
  '5501'?: number;
  /**
   * The polarity of the digital input as a Boolean (0 = Normal, 1= Reversed).
   */
  @property()
  '5502'?: boolean;
  /**
   * The debounce period in ms.
   */
  @property()
  '5503'?: number;
  /**
   * The edge selection as an integer (1 = Falling edge, 2 = Rising edge, 3 = Both Rising and Falling edge).
   */
  @property()
  '5504'?: number;
  /**
   * Reset the Counter value.
   */
  @property()
  '5505'?: string;
  /**
   * Unix Time. A signed integer representing the number of seconds since Jan 1st, 1970 in the UTC time zone.
   */
  @property()
  '5506'?: string;
  /**
   * For shorter times of a fraction of a second (i.e. 0.23).
   */
  @property()
  '5507'?: number;
  /**
   * The minimum measured value along the X axis.
   */
  @property()
  '5508'?: number;
  /**
   * The maximum measured value along the X axis.
   */
  @property()
  '5509'?: number;
  /**
   * The minimum measured value along the Y axis.
   */
  @property()
  '5510'?: number;
  /**
   * The maximum measured value along the Y axis.
   */
  @property()
  '5511'?: number;
  /**
   * The minimum measured value along the Z axis.
   */
  @property()
  '5512'?: number;
  /**
   * The maximum measured value along the Z axis.
   */
  @property()
  '5513'?: number;
  /**
   * The decimal notation of latitude, e.g. -43.5723 (World Geodetic System 1984).
   */
  @property()
  '5514'?: string;
  /**
   * The decimal notation of longitude, e.g. 153.21760 (World Geodetic System 1984).
   */
  @property()
  '5515'?: string;
  /**
   * The accuracy of the position in meters.
   */
  @property()
  '5516'?: string;
  /**
   * The velocity of the device as defined in 3GPP 23.032 GAD specification. This set of values may not be available if the device is static.
   */
  @property()
  '5517'?: any;
  /**
   * The timestamp of when the location measurement was performed.
   */
  @property()
  '5518'?: string;
  /**
   * The minimum value that can be measured by the sensor.
   */
  @property()
  '5519'?: number;
  /**
   * The maximum value that can be measured by the sensor.
   */
  @property()
  '5520'?: number;
  /**
   * The duration of the time delay.
   */
  @property()
  '5521'?: number;
  /**
   * Audio Clip that is playable (i.e. short audio recording indicating the floor in an elevator).
   */
  @property()
  '5522'?: Buffer | any;
  /**
   * Trigger initiating actuation.
   */
  @property()
  '5523'?: string;
  /**
   * The duration of the sound once trigger.
   */
  @property()
  '5524'?: number;
  /**
   * The off time when On/Off control remains on.
   */
  @property()
  '5525'?: number;
  /**
   * type of timer pattern used by the patterns.
   */
  @property()
  '5526'?: number;
  /**
   * A string of text.
   */
  @property()
  '5527'?: string;
  /**
   * X Coordinate.
   */
  @property()
  '5528'?: number;
  /**
   * Y Coordinate.
   */
  @property()
  '5529'?: number;
  /**
   * Command to clear the display.
   */
  @property()
  '5530'?: string;
  /**
   * Proportional control, integer value between 0 and 100 as a percentage.
   */
  @property()
  '5531'?: number;
  /**
   * Indicates an increase control action.
   */
  @property()
  '5532'?: boolean;
  /**
   * Indicates an decrease control action.
   */
  @property()
  '5533'?: boolean;
  /**
   * Counts the number of times the timer output transitions from 0 to 1.
   */
  @property()
  '5534'?: number;
  /**
   * Current position or desired position of a positioner actuator.
   */
  @property()
  '5536'?: number;
  /**
   * The time expected to move the actuator to the new position.
   */
  @property()
  '5537'?: number;
  /**
   * The time remaining in an operation.
   */
  @property()
  '5538'?: number;
  /**
   * Counts the number of times the increase control has been operated. Writing a 0 resets the counter.
   */
  @property()
  '5541'?: number;
  /**
   * Counts the times the decrease control has been operated. Writing a 0 resets the counter
   */
  @property()
  '5542'?: number;
  /**
   * The current state of the timer output.
   */
  @property()
  '5543'?: boolean;
  /**
   * The total time in seconds that the timer input is true. Writing a 0 resets the time.
   */
  @property()
  '5544'?: number;
  /**
   * The highest X coordinate the display supports before wrapping to the next line.
   */
  @property()
  '5545'?: number;
  /**
   * The highest Y coordinate the display supports before wrapping to the next line.
   */
  @property()
  '5546'?: number;
  /**
   * The current state of a Multi-state input or selector.
   */
  @property()
  '5547'?: number;
  /**
   * Input/output level control, float value between 0 and 100 as a percentage.
   */
  @property()
  '5548'?: number;
  /**
   * The current state of a digital output,  0=OFF, 1=ON..
   */
  @property()
  '5550'?: boolean;
  /**
   * The polarity of a digital ouput as a Boolean (0 = Normal, 1= Reversed).
   */
  @property()
  '5551'?: boolean;
  /**
   * The current value of the analog input.
   */
  @property()
  '5600'?: number;
  /**
   * The minimum value that can be measured by the sensor
   */
  @property()
  '5601'?: number;
  /**
   * The maximum value that can be measured by the sensor.
   */
  @property()
  '5602'?: number;
  /**
   * The minimum value that can be measured by the sensor.
   */
  @property()
  '5603'?: number;
  /**
   * The maximum value that can be measured by the sensor.
   */
  @property()
  '5604'?: number;
  /**
   * Reset the Min and Max Measured Values to Current Value.
   */
  @property()
  '5605'?: string;
  /**
   * The current state of the analogue output.
   */
  @property()
  '5650'?: number;
  /**
   * Last or Current Measured Value from the Sensor.
   */
  @property()
  '5700'?: number;
  /**
   * If present, the type of sensor defined as the UCUM Unit Definition e.g. “Cel” for Temperature in Celcius.
   */
  @property()
  '5701'?: string;
  /**
   * The measured value along the X axis.
   */
  @property()
  '5702'?: number;
  /**
   * The measured value along the Y axis.
   */
  @property()
  '5703'?: number;
  /**
   * The measured value along the Z axis.
   */
  @property()
  '5704'?: number;
  /**
   * The compass direction.
   */
  @property()
  '5705'?: number;
  /**
   * A string representing a value in some color space
   */
  @property()
  '5706'?: string;
  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string | any;
  /**
   * The type of the sensor (for instance PIR type).
   */
  @property()
  '5751'?: string;
  /**
   * The current active power.
   */
  @property()
  '5800'?: number;
  /**
   * The minimum active power measured by the sensor since it is ON.
   */
  @property()
  '5801'?: number;
  /**
   * The maximum active power measured by the sensor since it is ON.
   */
  @property()
  '5802'?: number;
  /**
   * The minimum active power that can be measured by the sensor.
   */
  @property()
  '5803'?: number;
  /**
   * The maximum active power that can be measured by the sensor.
   */
  @property()
  '5804'?: number;
  /**
   * The total power in Wh that the light has used.
   */
  @property()
  '5805'?: number;
  /**
   * Request an active power calibration by writing the value of a calibrated load.
   */
  @property()
  '5806'?: number;
  /**
   * The current reactive power.
   */
  @property()
  '5810'?: number;
  /**
   * The minimum reactive power measured by the sensor since it is ON.
   */
  @property()
  '5811'?: number;
  /**
   * The maximum reactive power measured by the sensor since it is ON.
   */
  @property()
  '5812'?: number;
  /**
   * The minimum active power that can be measured by the sensor.
   */
  @property()
  '5813'?: number;
  /**
   * The minimum active power that can be measured by the sensor.
   */
  @property()
  '5814'?: number;
  /**
   * The cumulative reactive power since the last cumulative energy reset or device start.
   */
  @property()
  '5815'?: number;
  /**
   * Request a reactive power calibration by writing the value of a calibrated load.
   */
  @property()
  '5816'?: number;
  /**
   * The power factor of the actuactor.
   */
  @property()
  '5820'?: number;
  /**
   * Read or Write the current calibration coefficient.
   */
  @property()
  '5821'?: number;
  /**
   * Reset both cumulative active/reactive power.
   */
  @property()
  '5822'?: string;
  /**
   * The event identifier as a string.
   */
  @property()
  '5823'?: string;
  /**
   * Time when the load control event will start started.
   */
  @property()
  '5824'?: number;
  /**
   * The duration of the load control event.
   */
  @property()
  '5825'?: number;
  /**
   * The criticality of the event.  The device receiving the event will react in an appropriate fashion for the device.
   */
  @property()
  '5826'?: number;
  /**
   * Defines the maximum energy usage of the receivng device, as a percentage of the device's normal maximum energy usage.
   */
  @property()
  '5827'?: string;
  /**
   * Defines the duty cycle for the load control event, i.e, what percentage of time the receiving device is allowed to be on.
   */
  @property()
  '5828'?: number;
  /**
   * This resource represents a power source, which can be controlled, the setting of which is a Boolean value (1,0) where 1 is on and 0 is off
   */
  @property()
  '5850'?: boolean;
  /**
   * This resource represents dimmer setting, which has an Integer value between 0 and 100 as a percentage.
   */
  @property()
  '5851'?: number;
  /**
   * The time in seconds that the device has been on. Writing a value of 0 resets the counter.
   */
  @property()
  '5852'?: number;
  /**
   * A string describing a state for multiple level output such as Pilot Wire.
   */
  @property()
  '5853'?: string;
  /**
   * The time in seconds since the Off command was sent. Writing a value of 0 resets the counter.
   */
  @property()
  '5854'?: number;
  /**
   * The setpoint value.
   */
  @property()
  '5900'?: number;
  /**
   * Delay from the detection state to the clear state in ms.
   */
  @property()
  '5903'?: number;
  /**
   * Delay from the clear state to the busy state in ms.
   */
  @property()
  '5904'?: number;
  /**
   * Integer in which each of the bits are associated with specific digital input value. Represented as a binary signed integer in network byte order, and in two's complement representation. Using values in range 0-127 is recommended to avoid ambiguities with byte order and negative values.
   */
  @property()
  '5910'?: number;
  // '5910'?: Buffer | number;
  /**
   * Reset the Bitmap Input value.
   */
  @property()
  '5911'?: string;
  /**
   * The description of each bit as a string. First instance describes the least significant bit, second instance the second least significant bit.
   */
  @property()
  '5912'?: string;
  /**
   * A universally unique identifier to identify information
   */
  @property()
  '5913'?: string;
  /**
   * PLMN - mcc/mnc
   */
  @property()
  '6030'?: number;
  /**
   * Band indicator
   */
  @property()
  '6031'?: number;
  /**
   * EARFCN - frequency
   */
  @property()
  '6032'?: number;
  /**
   * Cell Identity
   */
  @property()
  '6033'?: number;
  /**
   * PCI (0..504)
   */
  @property()
  '6034'?: number;
  /**
   * RSRP Value in dBm (-180..-30)
   */
  @property()
  '6035'?: number;
  /**
   * RSRQ Value in dB (-30..10)
   */
  @property()
  '6036'?: number;
  /**
   * System Frame Number
   */
  @property()
  '6037'?: number;
  /**
   * Sub Frame Number
   */
  @property()
  '6038'?: number;

  constructor(data?: Partial<SensorResource>) {
    super(data);
  }
}

export type SensorResources =
  | Accelerometer
  | Actuation
  | Acidity
  | Actuation
  | AddressableTextDisplay
  | Altitude
  | AnalogInput
  | AnalogOutput
  | AudioClip
  | Barometer
  | Bitmap
  | Buzzer
  | CellBlacklistEvent
  | CellReselectionEvent
  | Color
  | Concentration
  | Conductivity
  | Current
  | Depth
  | DigitalInput
  | DigitalOutput
  | Direction
  | Distance
  | Energy
  | Frequency
  | GenericSensor
  | GpsLocation
  | Gyrometer
  | HandoverEvent
  | HumiditySensor
  | IlluminanceSensor
  | LightControl
  | Load
  | LevelControl
  | LoadControl
  | Loudness
  | Magnetometer
  | MultipleAxisJoystick
  | MultistateSelector
  | OnOffSwitch
  | Percentage
  | PlmnSearchEvent
  | Positioner
  | Power
  | PowerControl
  | PowerFactor
  | PowerMeasurment
  | PowerupLog
  | PresenceSensor
  | Pressure
  | PushButton
  | RadioLinkFailureEvent
  | Rate
  | RrcStateChangeEvent
  | RrcTimerExpiryEvent
  | ScellId
  | SetPoint
  | Stopwatch
  | TemperatureSensor
  | Time
  | Timer
  | UpDownControl
  | Voltage;

/* eslint-enable @typescript-eslint/no-explicit-any */
