// @flow

import * as actions from '/types/shop/actions';

export default function shopReducer( state: any = { test: 'test' }, action: any ) {
  switch ( action.type ) {
    case actions.TEST:
      return { ...state, test: action.test };
    default:
      return state;
  }
}
