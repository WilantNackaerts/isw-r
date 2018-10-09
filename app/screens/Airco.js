// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Icon } from 'native-base';
import Temperature from '../components/airco/Temperature.js';
import Fan from '../components/airco/Fan.js';

export default class Airco extends Component<{}> {
  render() {
    return (
      <Container style={styles.container}>
        <Temperature extraStyles={styles.temp} />
        <Fan />
        <Button vertical style={styles.powerButton}>
          <Icon name='power' />
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    alignItems: 'stretch',
  },
  temp: {
    flexGrow: 2,
  },
  powerButton: {
    backgroundColor: '#D50000',
    alignSelf: 'stretch',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 15,
  },
} );
