// @flow

import * as actions from './actions';

export type Station = {
  name: string,
  logo: string,
  url: string,
};

export type Region = {
  name: string,
  apiName: string,
  loading: boolean,
  failed: boolean,
  stations: Station[],
};

export type ApiStation = {
  command: string,
  params: string,
  TITLE: string,
  logo: string,
};

export type StationsResponse = {
  stations: ApiStation[],
};

//
// ACTIONS
//

export type ActionBase = {
  region: string,
};

export type FetchStartAction = {
  ...ActionBase,
  type: typeof actions.FETCH_START,
};

export type FetchEndAction = {
  ...ActionBase,
  type: typeof actions.FETCH_END,
  stations: Station[],
};

export type FetchFailAction = {
  ...ActionBase,
  type: typeof actions.FETCH_FAIL,
};

export type Action = FetchStartAction | FetchEndAction | FetchFailAction;

export type State = Region[];
