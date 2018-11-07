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

export type PlayAction = {
  type: typeof actions.PLAY,
};

export type PauseAction = {
  type: typeof actions.PAUSE,
};

export type VolumeAction = {
  type: typeof actions.VOLUME,
  volume: number,
};

export type NextAction = {
  type: typeof actions.NEXT,
};

export type Action = FetchStartAction | FetchEndAction | PlayAction | PauseAction | VolumeAction | NextAction;

export type State = {
  currentSong: Song,
  muted: boolean,
  paused: boolean,
  volume: number,
}
