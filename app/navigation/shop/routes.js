// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import type { NavigationNavigatorProps, HeaderProps } from 'react-navigation';

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
  [ PRODUCTS ]: {
    screen: Products,
    navigationOptions: ( props: NavigationNavigatorProps ) => ( {
      headerTitle: props.navigation.getParam( 'username', 'Products' ),
      headerRight: ( props: HeaderProps ) => (
        <Icon name='create' style={styles.icon} onPress={() => props.navigation.navigate( USERS )} />
      ),
    } ),
  },
  [ ORDER ]: Order,
};

const styles = StyleSheet.create( {
  icon: {
    color: 'white',
  },
} );
