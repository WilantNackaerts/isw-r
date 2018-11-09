// @flow

import * as actions from '/types/shop/actions';
import type { Dispatch, Thunk } from '/types';
import { SHOP_API_URL } from '/config';
import type {
  ApiUser,
  User,
  ApiProduct,
  Product,
  FetchUsersResponse,
  FetchProductsResponse,
  FetchUsersStartAction,
  FetchUsersEndAction,
  FetchProductsStartAction,
  FetchProductsEndAction,
} from '/types/shop';

function convertUser( user: ApiUser ): User {
  return {
    id: user.id,
    username: user.uname,
    firstName: user.fname,
    lastName: user.lname,
    active: user.active,
    limit: user.limit,
  };
}

function filterUser( user: User ): boolean {
  return user.active;
}

function convertProduct( product: ApiProduct ): Product {
  return { ...product };
}

function filterProduct( product: Product ): boolean {
  return product.shopable;
}

function _fetchUsersStart(): FetchUsersStartAction {
  return {
    type: actions.FETCH_USERS_START,
  };
}

function _fetchUsersEnd( res: FetchUsersResponse ): FetchUsersEndAction {
  return {
    type: actions.FETCH_USERS_END,
    users: res.data.map( convertUser ).filter( filterUser ),
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
    products: res.data.map( convertProduct ).filter( filterProduct ),
  };
}

export function fetchUsers(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _fetchUsersStart() );

    fetch( SHOP_API_URL + '/users' )
      .then( res => res.json() )
      .then( ( res: FetchUsersResponse ) => dispatch( _fetchUsersEnd( res ) ) )
      .catch( console.error );
  };
}

export function fetchProducts(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _fetchProductsStart() );

    fetch( SHOP_API_URL + '/items' )
      .then( res => res.json() )
      .then( ( res: FetchProductsResponse ) => dispatch( _fetchProductsEnd( res ) ) )
      .catch( console.error );
  };
}

