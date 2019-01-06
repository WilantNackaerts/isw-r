// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Container, Icon } from 'native-base';
import Power from '/components/airco/Power.js';
import Temperature from '/components/airco/Temperature.js';
import Fan from '/components/airco/Fan.js';

type Props = {|
  
|};

export default class Airco extends Component<Props> {
  render() {
    return (
      <Container style={styles.container}>
        <Icon name='snow' style={styles.image} />
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
  image: {
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 120,
    color: '#ddd',
  },
  sliders: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
} );
