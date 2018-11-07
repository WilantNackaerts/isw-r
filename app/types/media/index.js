// @flow

import type { Action as RadioAction, State as RadioState } from './radio';
import type { Action as SoundboardAction, State as SoundboardState } from './soundboard';
import type { Action as YoutubeAction, State as YoutubeState } from './youtube';
import type { Action as PlayerAction, State as PlayerState } from './player';

export type Action = RadioAction | SoundboardAction | YoutubeAction | PlayerAction;

export type State = {
  radio: RadioState,
  soundboard: SoundboardState,
  youtube: YoutubeState,
  player: PlayerState,
};
