// @flow

import * as actions from '../actionTypes/shop';

export default function shopReducer( state: any = { test: 'test' }, action: any ) {
  switch ( action.type ) {
    case actions.TEST:
      return { ...state, test: action.test };
    default:
      return state;
  }
}
