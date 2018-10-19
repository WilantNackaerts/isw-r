// @flow

import * as actions from './actions';

export type Sound = string;
export type Folder = string;
export type Item = Sound | Folder;

export type SetSoundsAction = {
  type: typeof actions.SET_SOUNDS,
  sounds: Item[],
  folders: Folder[],
  soundsNF: Sound[],
};

export type Action = SetSoundsAction;

export type State = {
  isLoading: boolean,
  sounds: Item[],
  folders: Folder[],
  soundsNF: Sound[],
};
