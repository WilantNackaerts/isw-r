// @flow

import * as actions from './actions';

export type ApiSong = {
  id: number,
  TITLE: string,
  URL: string, // Path to cached download, not a public URL
  CLIENT_DNS_ADDRESS: string, // Name of the host that added the song to the playlist
  CLIENT_ADDRESS: string, // IP address of the host that added the song to the playlist
  TIMESTAMP: string, // When the song was added to the playlist
  logo: string, // URL to the thumbnail
  command: string,
  params: string,
};

export type ApiCurrentSong = {
  title: string,
  thumb: string,
  position: number,
  length: number,
};

export type ApiStatus = {
  playlist: ApiSong[],
  playingNow: ApiSong,
  previous: ApiSong,
  next: ApiSong,
  current: ApiCurrentSong,
  muted: boolean,
  paused: boolean,
  volume: number,
  plp: number,
};

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
  queue: Song[],
  currentSong: Song,
  muted: boolean,
  paused: boolean,
  volume: number,
  queuePosition: number,
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

export type ToggleMutedAction = {
  type: typeof actions.TOGGLE_MUTED,
};

export type NextAction = {
  type: typeof actions.NEXT,
};

export type PreviousAction = {
  type: typeof actions.PREVIOUS,
};

export type Action =
  FetchStartAction |
  FetchEndAction |
  PlayAction |
  PauseAction |
  VolumeAction |
  ToggleMutedAction |
  NextAction |
  PreviousAction;

export type State = {|
  queue: Song[],
  currentSong: Song,
  muted: boolean,
  paused: boolean,
  volume: number,
  queuePosition: number,
|};
