// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Container } from 'native-base';
import Power from '/components/airco/Power.js';
import Temperature from '/components/airco/Temperature.js';
import Fan from '/components/airco/Fan.js';

type Props = {|
  
|};

export default class Airco extends Component<Props> {
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.sliders}>
          <Temperature />
          <Fan />
        </View>
        <Power />
      </Container>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  sliders: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
} );
