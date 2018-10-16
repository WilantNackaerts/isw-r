// @flow

import { RADIO_SETSTATIONS } from '../../actions.js';

type RadioSetStationAction = {
  type: typeof RADIO_SETSTATIONS,
  vrtItems: [string],
}

export function radioSetStations( vrtItems: [string] ): RadioSetStationAction {
  return {
    type: RADIO_SETSTATIONS,
    vrtItems,
  };
}
