// @flow

import * as actions from './actions';

export type ApiSound = {
  command: string,
  params: string,
  urlSnip: string,
  TITLE: string,
  logo: string,
};

export type Item = {
  name: string,
  path: string,
  isFolder: boolean,
};

export type FetchStartAction = {
  type: typeof actions.FETCH_START,
};

export type FetchEndAction = {
  type: typeof actions.FETCH_END,
  items: Item[],
};

export type Action = FetchStartAction | FetchEndAction;

export type State = {
  isLoading: boolean,
  items: Item[],
  prefix: string,
};
