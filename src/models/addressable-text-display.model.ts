import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - AddressableTextDisplay
 * used to send text to a text-only or text mode graphics display. POSTing a string of text to the text resource causes it to be displayed at the selected X and Y locations on the display. If X or Y are set to a value greater than the size of the display, the position “wraps around” to the modulus of the setting and the display size. Likewise, if the text string overflows the display size, the text “wraps around” and displays on the next line down or, if the last line has been written, wraps around to the top of the display. Brightness and Contrast controls are provided to allow control of various display types including STN and DSTN type LCD character displays. POSTing an empty payload to the Clear Display resource causes the display to be erased.
 */
@model({name: 'AddressableTextDisplay'})
export class AddressableTextDisplay {
  constructor(data?: Partial<AddressableTextDisplay>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

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
   * Input/output level control, float value between 0 and 100 as a percentage.
   */
  @property()
  '5548'?: number;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;

  /**
   * This resource represents a power source, which can be controlled, the setting of which is a Boolean value (1,0) where 1 is on and 0 is off
   */
  @property()
  '5850'?: boolean;
}

export interface AddressableTextDisplayRelations {
  // describe navigational properties here
}

export type AddressableTextDisplayWithRelations = AddressableTextDisplay &
  AddressableTextDisplayRelations;
