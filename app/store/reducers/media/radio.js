// @flow

import { RADIO_SETSTATIONS } from '../../actions';

export default function radioReducer( state: any, action: any ) {
  switch ( action.type ) {
    case RADIO_SETSTATIONS:
      return { ...state,vrtItems: action.vrtItems };
    default:
      return state;
  }
}
