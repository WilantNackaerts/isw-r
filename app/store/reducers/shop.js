// @flow

import { SHOP_TEST } from '../actions.js';

export default function shopReducer( state: any = { test: 'test' }, action: any ) {
  switch ( action.type ) {
    case SHOP_TEST:
      return { ...state, test: action.test };
    default:
      return state;
  }
}
