// @flow

import * as actions from '/types/shop/actions';
import type { State, Action } from '/types/shop';

function defaultState(): State {
  return {
    users: [],
    products: [],
    loadingUsers: true,
    loadingProducts: true,
  };
}

export default function shopReducer( state: State = defaultState(), action: Action ) {
  switch ( action.type ) {
    case actions.FETCH_USERS_START:
      return { ...state, loadingUsers: true };
    case actions.FETCH_USERS_END:
      return { ...state, loadingUsers: false, users: action.users };
    case actions.FETCH_PRODUCTS_START:
      return { ...state, loadingProducts: true };
    case actions.FETCH_PRODUCTS_END:
      return { ...state, loadingProducts: false, products: action.products };
    default:
      return state;
  }
}
