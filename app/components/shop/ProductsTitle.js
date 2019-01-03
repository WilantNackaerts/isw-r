// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import type { State } from '/types';

type Props = {
  username: string,
};

class ProductsTitle extends Component<Props> {
  render() {
    return (
      <Text style={styles.title}>Products - {this.props.username}</Text>
    );
  }
}

const styles = StyleSheet.create( {
  title: {
    color: 'white',
    fontSize: 20,
  },
} );

function mapStateToProps( state: State ) {
  return {
    username: state.shop.username,
  };
}

export default connect( mapStateToProps )( ProductsTitle );
