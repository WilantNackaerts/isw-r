// @flow

import type { Action as RadioAction, State as RadioState } from './radio';
import type { Action as SoundboardAction, State as SoundboardState } from './soundboard';

export type Action = RadioAction | SoundboardAction;

export type State = {
  radio: RadioState,
  soundboard: SoundboardState,
};
