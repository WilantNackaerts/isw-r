// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Footer, Text, Button, Toast } from 'native-base';
import PinModal from './PinModal.js';
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

type LocalState = {
  modalVisible: boolean,
};

class Order extends Component<Props, LocalState> {
  state = {
    modalVisible: false,
  };
  
  performOrder( pin: string ) {
    this.props.pay( this.props.username, pin, this.props.basket );
    Toast.show( {
      text: 'payment succesful',
      type: 'success',
      buttonText: 'Okay',
    } );
  }
  
  order() {
    AsyncStorage.getItem( 'pin' )
      .then( pin => {
        if ( pin ) {
          this.performOrder( pin );
        }
        else {
          this.openModal();
        }
      } );
  }
  
  onPin( pin: string ) {
    this.closeModal();
    this.performOrder( pin );
  }
  
  openModal() {
    this.setState( { modalVisible: true } );
  }
  
  closeModal() {
    this.setState( { modalVisible: false } );
  }
  
  render() {
    return (
      <Footer style={styles.basket}>
        <Text style={styles.total}>€{this.props.total.toFixed( 2 )}</Text>
        <Button rounded success onPress={this.order.bind( this )}>
          <Text>PAY</Text>
        </Button>
        <PinModal visible={this.state.modalVisible} onCancel={this.closeModal.bind( this )} onPin={this.onPin.bind( this )} />
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
    username: state.shop.username,
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
