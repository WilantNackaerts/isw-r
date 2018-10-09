// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

type Props = {
  extraStyles: {}
}

export default class Temperature extends Component<Props> {
  render() {
    return (
      <View style={[ styles.container, this.props.extraStyles ]}>
        <View>
          <Button transparent>
            <Text style={styles.temp}>-</Text>
          </Button>
        </View>
        <Text style={styles.temp}>21°C</Text>
        <View>
          <Button transparent>
            <Text style={styles.temp}>+</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    color: 'green',
    fontSize: 70,
    marginBottom: 30,
  },
} );
