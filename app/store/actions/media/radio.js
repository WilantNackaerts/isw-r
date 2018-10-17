// @flow

import { RADIO_SETVRT, RADIO_SETBE } from '../../actions.js';

type RadioSetVrtAction = {
  type: typeof RADIO_SETVRT,
  vrtItems: [string],
}

type RadioSetBeAction = {
  type: typeof RADIO_SETBE,
  beItems: [string],
}

export function radioSetVrtStations( vrtItems: [string] ): RadioSetVrtAction {
  return {
    type: RADIO_SETVRT,
    vrtItems,
  };
}

export function radioSetBeStations( beItems: [string] ): RadioSetBeAction {
  return {
    type: RADIO_SETBE,
    beItems,
  };
}
