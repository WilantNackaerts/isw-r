// @flow

import * as actions from '../../actionTypes/media/radio.js';

export default function radioReducer( state: any = { isLoading:true }, action: any ) {
  switch ( action.type ) {
    case actions.FETCH_VRT:
      return { ...state, isLoading: true };
    case actions.FETCH_BE:
      return { ...state, isLoading: true };
    case actions.SET_VRT:
      return { ...state, isLoading: false, vrtItems: action.vrtItems };
    case actions.SET_BE:
      return { ...state, isLoading: false, beItems: action.beItems };
    default:
      return state;
  }
}
