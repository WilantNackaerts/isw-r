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

export type FetchProductsStartAction = {
  type: typeof actions.FETCH_PRODUCTS_START,
};

export type FetchProductsEndAction = {
  type: typeof actions.FETCH_PRODUCTS_END,
  products: Product[],
};

export type Action =
  FetchUsersStartAction |
  FetchUsersEndAction |
  FetchProductsStartAction |
  FetchProductsEndAction;

export type State = {
  users: User[],
  products: Product[],
  loadingUsers: boolean,
  loadingProducts: boolean,
};
