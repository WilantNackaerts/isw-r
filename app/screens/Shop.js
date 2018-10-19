// @flow

import React, { Component } from 'react';
import { Text, View, Button } from 'native-base';
import { connect } from 'react-redux';
import { shopTest } from '../store/actions/shop';

type Props = {
  test: string,
  onPress: () => void
}

class Shop extends Component<Props> {
  render() {
    return (
      <View>
        <Text>Shop</Text>
        <Text>{this.props.test}</Text>
        <Button onPress={this.props.onPress}>
          <Text>setTest</Text>
        </Button>
      </View>
    );
  }
}

function mapStateToProps( state ) {
  return {
    test: state.shop.test,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    onPress() {
      dispatch( shopTest() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Shop );
