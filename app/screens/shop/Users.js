// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'native-base';
import { PRODUCTS } from '/navigation/shop/routes';
import type { NavigationScreenProp } from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp,
};

export default class Users extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Users</Text>
        <Button onPress={() => this.props.navigation.navigate( PRODUCTS )}>
          <Text>Go to products</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
} );
