// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'native-base';
import { ORDER } from '/navigation/shop/routes';
import type { NavigationScreenProp } from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp,
};

export default class Products extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Products</Text>
        <Button onPress={() => this.props.navigation.navigate( ORDER )}>
          <Text>Go to order</Text>
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
