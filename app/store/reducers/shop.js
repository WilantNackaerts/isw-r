// @flow

import * as actions from '/types/shop/actions';
import type { State, Action, Product, ProductMap } from '/types/shop';

function defaultState(): State {
  return {
    users: [],
    products: [],
    productsById: {},
    loadingUsers: false,
    loadUsersFailed: false,
    reloadingUsers: false,
    loadingProducts: false,
    loadProductsFailed: false,
    reloadingProducts: false,
    basket: {},
    total: 0,
  };
}

function prodsById( prods: Product[] ): ProductMap {
  const res = {};

  for ( const prod of prods ) {
    res[ prod.id ] = prod;
  }

  return res;
}

function addTotal( state: State ): State {
  let total = 0;

  for ( const [ prodId, amount ] of Object.entries( state.basket ) ) {
    // $FlowFixMe This works, trust me
    total += amount * state.productsById[ prodId ].price;
  }

  state.total = total;

  return state;
}

function clamp( min: number, max: number, value: number ): number {
  return Math.max( min, Math.min( max, value ) );
}

export default function shopReducer( state: State = defaultState(), action: Action ) {
  switch ( action.type ) {
    case actions.FETCH_USERS_START:
      return { ...state, loadingUsers: true };
    case actions.FETCH_USERS_END:
      return { ...state, loadingUsers: false, loadUsersFailed: false, reloadingUsers: false, users: action.users };
    case actions.FETCH_USERS_FAIL:
      return { ...state, loadingUsers: false, loadUsersFailed: !action.soft, reloadingUsers: false };
    case actions.RELOAD_USERS:
      return { ...state, reloadingUsers: true };
    case actions.FETCH_PRODUCTS_START:
      return { ...state, loadingProducts: true };
    case actions.FETCH_PRODUCTS_END:
      return addTotal( {
        ...state,
        loadingProducts: false,
        loadProductsFailed: false,
        reloadingProducts: false,
        products: action.products,
        productsById: prodsById( action.products ),
      } );
    case actions.FETCH_PRODUCTS_FAIL:
      return { ...state, loadingProducts: false, loadProductsFailed: !action.soft, reloadingProducts: false };
    case actions.RELOAD_PRODUCTS:
      return { ...state, reloadingProducts: true };
    case actions.ORDER_ITEM:
      return addTotal( {
        ...state,
        basket: {
          ...state.basket,
          [ action.productId ]: clamp( 0, 9, ( state.basket[ action.productId ] || 0 ) + action.amount ),
        },
      } );
    case actions.RESET_BASKET:
      return { ...state, basket: {}, total: 0 };
    case actions.SET_USERNAME:
      return { ...state, username: action.username };
    default:
      return state;
  }
}
