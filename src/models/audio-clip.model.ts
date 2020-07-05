/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - AudioClip
 * used for a speaker that plays a pre-recorded audio clip or an audio output that is sent elsewhere. For example, an elevator which announces the floor of the building. A resource is provided to store the clip, a dimmer resource controls the relative sound level of the playback, and a duration resource limits the maximum playback time. After the duration time is reached, any remaining samples in the clip are ignored, and the clip player will be ready to play another clip.
 */
@model({name: 'AudioClip'})
export class AudioClip {
  constructor(data?: Partial<AudioClip>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * Audio Clip that is playable (i.e. short audio recording indicating the floor in an elevator).
   */
  @property()
  '5522'?: any;

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
   * Input/output level control, float value between 0 and 100 as a percentage.
   */
  @property()
  '5548'?: number;

  /**
   * The application type of the sensor or actuator as a string, for instance, “Air Pressure”.
   */
  @property()
  '5750'?: string;
}

export interface AudioClipRelations {
  // describe navigational properties here
}

export type AudioClipWithRelations = AudioClip & AudioClipRelations;
