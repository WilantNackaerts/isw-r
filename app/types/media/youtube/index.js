// @flow

import * as actions from './actions';

export type Song = {
  title: string,
  description: string,
  thumbnail: {
    default: {
      url: string,
      width: number,
      height: number,
    }
  }
};

export type SearchTerm = {
  searchTerm: string,
};

export type FetchStartAction = {
  type: typeof actions.FETCH_START,
};

export type FetchEndAction = {
  type: typeof actions.FETCH_END,
  songs: Song[],
};

export type Action = FetchStartAction | FetchEndAction;

export type State = {
  isLoading: boolean,
  songs: Song[],
};
