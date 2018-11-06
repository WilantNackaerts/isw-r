// @flow

import * as actions from './actions';

export type Song = { 
  title: string,
  thumb: string,
  position: number,
  length: number,
};

export type FetchStartAction = {
  type: typeof actions.FETCH_START,
};

export type FetchEndAction = {
  type: typeof actions.FETCH_END,
  currentSong: Song,
  muted: boolean,
  paused: boolean,
  volume: number,
}

export type Action = FetchStartAction | FetchEndAction;

export type State = {
  currentSong: Song,
  muted: boolean,
  paused: boolean,
  volume: number,
}
