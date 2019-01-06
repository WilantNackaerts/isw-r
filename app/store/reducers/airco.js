// @flow

import * as actions from '/types/airco/actions.js';
import type { Action, State } from '/types/airco/index.js';

function defaultState(): State {
  return {
    poweredOn: false,
    temp: 20,
    fanPower: 2,
    fanAuto: false,
  };
}

export default function aircoReducer( state: State = defaultState(), action: Action ): State {
  switch ( action.type ) {
    case actions.TOGGLE_POWER:
      return { ...state, poweredOn: !state.poweredOn };
    case actions.SET_TEMP:
      return { ...state, temp: action.value };
    case actions.SET_FAN_POWER:
      return { ...state, fanPower: action.value };
    case actions.TOGGLE_FAN_AUTO:
      return { ...state, fanAuto: !state.fanAuto };
    default:
      return state;
  }
}
