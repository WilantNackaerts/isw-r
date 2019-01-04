// @flow

import * as actions from '/types/shop/actions';
import type { Dispatch, Thunk } from '/types';
import { SHOP_API_URL } from '/config';
import { catcher } from '/util/error.js';
import type {
  ApiUser,
  User,
  ApiProduct,
  Product,
  FetchUsersResponse,
  FetchProductsResponse,
  FetchUsersStartAction,
  FetchUsersEndAction,
  FetchUsersFailAction,
  ReloadUsersAction,
  FetchProductsStartAction,
  FetchProductsEndAction,
  FetchProductsFailAction,
  ReloadProductsAction,
  ResetBasketAction,
  OrderItemAction,
  SetUsernameAction,
} from '/types/shop';

function sort( a: string, b: string ): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function processUsers( users: ApiUser[] ): User[] {
  return users
    .filter( user => user.active )
    .sort( ( a, b ) => sort( a.uname.toLowerCase(), b.uname.toLowerCase() ) )
    .map( user => ( {
      id: user.id,
      username: user.uname,
      firstName: user.fname,
      lastName: user.lname,
      active: user.active,
      limit: user.limit,
    } ) );
}

function processProducts( products: ApiProduct[] ): Product[] {
  return products
    .filter( product => product.shopable );
}

function _fetchUsersStart(): FetchUsersStartAction {
  return {
    type: actions.FETCH_USERS_START,
  };
}

function _fetchUsersEnd( res: FetchUsersResponse ): FetchUsersEndAction {
  return {
    type: actions.FETCH_USERS_END,
    users: processUsers( res.data ),
  };
}

function _fetchUsersFail( soft?: boolean = false ): FetchUsersFailAction {
  return {
    type: actions.FETCH_USERS_FAIL,
    soft,
  };
}

function _reloadUsers(): ReloadUsersAction {
  return {
    type: actions.RELOAD_USERS,
  };
}

function _fetchProductsStart(): FetchProductsStartAction {
  return {
    type: actions.FETCH_PRODUCTS_START,
  };
}

function _fetchProductsEnd( res: FetchProductsResponse ): FetchProductsEndAction {
  return {
    type: actions.FETCH_PRODUCTS_END,
    products: processProducts( res.data ),
  };
}

function _fetchProductsFail( soft?: boolean = false ): FetchProductsFailAction {
  return {
    type: actions.FETCH_PRODUCTS_FAIL,
    soft,
  };
}

function _reloadProducts(): ReloadProductsAction {
  return {
    type: actions.RELOAD_PRODUCTS,
  };
}

function _fetchUsers( dispatch: Dispatch ): Promise<FetchUsersResponse> {
  return fetch( SHOP_API_URL + '/users' )
    .then( res => res.json() )
    .then( ( res: FetchUsersResponse ) => dispatch( _fetchUsersEnd( res ) ) );
}

export function fetchUsers(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _fetchUsersStart() );
    
    _fetchUsers( dispatch )
      .catch( () => dispatch( _fetchUsersFail() ) );
  };
}

export function reloadUsers(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _reloadUsers() );
    
    _fetchUsers( dispatch )
      .catch( catcher( 'Oops! Failed to load users.', () => dispatch( _fetchUsersFail( true ) ) ) );
  };
}

function _fetchProducts( dispatch: Dispatch, soft?: boolean ): Promise<FetchProductsResponse> {
  return fetch( SHOP_API_URL + '/items' )
    .then( res => res.json() )
    .then( ( res: FetchProductsResponse ) => dispatch( _fetchProductsEnd( res ) ) );
}

export function fetchProducts(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _fetchProductsStart() );
    
    _fetchProducts( dispatch )
      .catch( () => dispatch( _fetchProductsFail() ) );
  };
}

export function reloadProducts(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _reloadProducts() );
    
    _fetchProducts( dispatch )
      .catch( catcher( 'Oops! Failed to load products.', () => dispatch( _fetchProductsFail( true ) ) ) );
  };
}

export function orderItem( productId: number, amount: number ): OrderItemAction {
  return {
    type: actions.ORDER_ITEM,
    productId,
    amount,
  };
}

export function resetBasket(): ResetBasketAction {
  return {
    type: actions.RESET_BASKET,
  };
}

export function setUsername( username: string ): SetUsernameAction {
  return {
    type: actions.SET_USERNAME,
    username,
  };
}
