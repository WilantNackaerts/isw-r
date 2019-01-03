// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Footer, Text, Button, Toast } from 'native-base';
import { TEXT, FOOTER } from '/styles';
import { pay } from '/store/actions/shop';
import type { Basket } from '/types/shop';
import type { State, Dispatch } from '/types';

type Props = {
  total: number,
  username: string,
  pin: string,
  basket: Basket,
  pay: ( username: string, pin: string, basket: Basket ) => void
};

class Order extends Component<Props> {
  render() {
    return (
      <Footer style={styles.basket}>
        <Text style={styles.total}>€{this.props.total.toFixed( 2 )}</Text>
        <Button rounded success
          onPress={() => {
            this.props.pay( this.props.username, this.props.pin, this.props.basket );
            Toast.show( {
              text: 'payment succesful',
              type: 'success',
              buttonText: 'Okay',
            } );
          }
          }
        >
          <Text>PAY</Text>
        </Button>
      </Footer>
    );
  }
}

const styles = StyleSheet.create( {
  basket: {
    ...FOOTER,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    ...TEXT,
    fontSize: 25,
  },
} );

function mapStateToProps( state: State ) {
  return {
    total: state.shop.total,
    canOrder: state.shop.total > 0,
    basket: state.shop.basket,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    pay( username: string, pin: string, basket: Basket ) {
      dispatch( pay( username, pin, basket ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Order );
