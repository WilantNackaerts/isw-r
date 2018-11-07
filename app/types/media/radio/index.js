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

export type FetchStartAction = {
  type: typeof actions.FETCH_START,
  region: string,
};

export type FetchEndAction = {
  type: typeof actions.FETCH_END,
  region: string,
  stations: Station[],
};

export type Action = FetchStartAction | FetchEndAction;

export type State = Region[];
