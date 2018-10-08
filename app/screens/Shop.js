// @flow

import React, { Component } from 'react';
import { Text, View, Button } from 'native-base';
import { connect } from 'react-redux';

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
        <Button onPress={this.props.onPress} ><Text>setTest</Text></Button>
      </View>
    );
  }
}

function mapStateToProps( state ) {
  return state;
}

function mapDispatchToProps( dispatch ) {
  return {
    onPress() {
      dispatch( { type: 'setTest', test: 'uht78yjhijkh8niuhgt67' } );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Shop );
