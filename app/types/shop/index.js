// @flow

import * as actions from './actions';

export type ApiUser = {
  id: number,
  uname: string,
  fname: string,
  lname: string,
  active: boolean,
  limit: number,
};

export type User = {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  active: boolean,
  limit: number,
};

export type ApiProduct = {
  id: number,
  name: string,
  drink: boolean,
  shopable: boolean,
  image: string, // URL to the image
  price: number,
  price2: number,
  cal: number,
};

export type Product = ApiProduct;

export type ProductMap = {
  [ productId: number ]: Product,
};

export type Basket = {
  [ productId: number ]: number,
};

export type FetchUsersResponse = {
  data: ApiUser[],
};

export type FetchProductsResponse = {
  data: ApiProduct[],
};

export type FetchUsersStartAction = {
  type: typeof actions.FETCH_USERS_START,
};

export type FetchUsersEndAction = {
  type: typeof actions.FETCH_USERS_END,
  users: User[],
};

export type FetchUsersFailAction = {
  type: typeof actions.FETCH_USERS_FAIL,
  soft: boolean,
};

export type ReloadUsersAction = {
  type: typeof actions.RELOAD_USERS,
};

export type FetchProductsStartAction = {
  type: typeof actions.FETCH_PRODUCTS_START,
};

export type FetchProductsEndAction = {
  type: typeof actions.FETCH_PRODUCTS_END,
  products: Product[],
};

export type FetchProductsFailAction = {
  type: typeof actions.FETCH_PRODUCTS_FAIL,
  soft: boolean,
};

export type ReloadProductsAction = {
  type: typeof actions.RELOAD_PRODUCTS,
};

export type OrderItemAction = {
  type: typeof actions.ORDER_ITEM,
  productId: number,
  amount: number,
}

export type ResetBasketAction = {
  type: typeof actions.RESET_BASKET,
};

export type SetUsernameAction = {
  type: typeof actions.SET_USERNAME,
  username: string,
}

export type Action =
  FetchUsersStartAction |
  FetchUsersEndAction |
  FetchUsersFailAction |
  ReloadUsersAction |
  FetchProductsStartAction |
  FetchProductsEndAction |
  FetchProductsFailAction |
  ReloadProductsAction |
  ResetBasketAction |
  OrderItemAction |
  SetUsernameAction;

export type State = {|
  users: User[],
  products: Product[],
  productsById: ProductMap,
  loadingUsers: boolean,
  loadUsersFailed: boolean,
  reloadingUsers: boolean,
  loadingProducts: boolean,
  loadProductsFailed: boolean,
  reloadingProducts: boolean,
  basket: Basket,
  total: number,
  username?: string,
|};
