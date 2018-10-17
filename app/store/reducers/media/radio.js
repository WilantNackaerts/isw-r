// @flow

import { RADIO_SETVRT, RADIO_SETBE } from '../../actions';

export default function radioReducer( state: any = { isLoading:true }, action: any ) {
  switch ( action.type ) {
    case RADIO_SETVRT:
      return { ...state, isLoading: false, vrtItems: action.vrtItems };
    case RADIO_SETBE:
      return { ...state, isLoading: false, beItems: action.beItems };
    default:
      return state;
  }
}
