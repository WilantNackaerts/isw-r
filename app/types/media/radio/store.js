// @flow

import type { Station } from './index.js';
import * as actions from './actions.js';

export type FetchStartAction = {
  type: typeof actions.FETCH_START,
  region: string,
};

export type FetchEndAction = {
  type: typeof actions.FETCH_END,
  region: string,
  stations: Station[],
};
