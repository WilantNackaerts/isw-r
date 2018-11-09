// @flow

import Users from '/screens/shop/Users';
import Products from '/screens/shop/Products';
import Order from '/screens/shop/Order';

export const USERS: 'shop/users' = 'shop/users';
export const PRODUCTS: 'shop/products' = 'shop/products';
export const ORDER: 'shop/order' = 'shop/order';

export default {
  [ USERS ]: {
    screen: Users,
    navigationOptions: {
      headerTitle: 'Who are you?',
    },
  },
  [ PRODUCTS ]: Products,
  [ ORDER ]: Order,
};
