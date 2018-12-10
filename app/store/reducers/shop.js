// @flow

import * as actions from '/types/shop/actions';
import type { State, Action, Product, ProductMap } from '/types/shop';

function defaultState(): State {
  return {
    users: [],
    products: [],
    productsById: {},
    loadingUsers: true,
    loadingProducts: true,
    basket: {},
    total: 0,
    toastVisible: false,
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

export default function shopReducer( state: State = defaultState(), action: Action ) {
  switch ( action.type ) {
    case actions.FETCH_USERS_START:
      return { ...state, loadingUsers: true };
    case actions.FETCH_USERS_END:
      return { ...state, loadingUsers: false, users: action.users };
    case actions.FETCH_PRODUCTS_START:
      return { ...state, loadingProducts: true };
    case actions.FETCH_PRODUCTS_END:
      return addTotal( {
        ...state,
        loadingProducts: false,
        products: action.products,
        productsById: prodsById( action.products ),
      } );
    case actions.ORDER_ITEM:
      return addTotal( {
        ...state,
        basket: {
          ...state.basket,
          [ action.productId ]: ( state.basket[ action.productId ] || 0 ) + action.amount,
        },
      } );
    case actions.FETCH_PAY_START:
      return { ...state };
    case actions.FETCH_PAY_END:
      return { ...state, basket: {}, total: 0, toastVisible: true };
    default:
      return state;
  }
}
