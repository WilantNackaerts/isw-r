// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import ProductsTitle from '/components/shop/ProductsTitle.js';
import type { NavigationNavigatorProps, HeaderProps } from 'react-navigation';

import Users from '/screens/shop/Users';
import Products from '/screens/shop/Products';

export const USERS: 'shop/users' = 'shop/users';
export const PRODUCTS: 'shop/products' = 'shop/products';

export default {
  [ USERS ]: {
    screen: Users,
    navigationOptions: {
      headerTitle: 'Who are you?',
    },
  },
  [ PRODUCTS ]: {
    screen: Products,
    navigationOptions: ( props: NavigationNavigatorProps ) => ( {
      headerTitle: <ProductsTitle />,
      headerRight: ( props: HeaderProps ) => (
        <Icon name='create' style={styles.icon} onPress={() => props.navigation.navigate( USERS, { force: true } )} />
      ),
    } ),
  },
};

const styles = StyleSheet.create( {
  icon: {
    color: 'white',
  },
} );
