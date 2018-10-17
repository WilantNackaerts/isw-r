// @flow

import * as actions from '../actionTypes/shop.js';

export default function shopReducer( state: any = { test: 'test' }, action: any ) {
  switch ( action.type ) {
    case actions.TEST:
      return { ...state, test: action.test };
    default:
      return state;
  }
}
