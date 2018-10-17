// @flow

import * as actions from '../../actionTypes/media/radio.js';

type RadioSetVrtAction = {
  type: typeof actions.SET_VRT,
  vrtItems: [string],
}

type RadioSetBeAction = {
  type: typeof actions.SET_BE,
  beItems: [string],
}

export function radioSetVrtStations( vrtItems: [string] ): RadioSetVrtAction {
  return {
    type: actions.SET_VRT,
    vrtItems,
  };
}

export function radioSetBeStations( beItems: [string] ): RadioSetBeAction {
  return {
    type: actions.SET_BE,
    beItems,
  };
}
