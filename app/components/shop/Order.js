// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Footer, Text, Button, Spinner } from 'native-base';
import { withNavigation, type NavigationScreenProp } from 'react-navigation';
import PinModal from './PinModal.js';
import { TEXT, FOOTER } from '/styles';
import { resetBasket } from '/store/actions/shop.js';
import error from '/util/error.js';
import { progress } from '/util/timeout.js';
import toast from '/util/toast.js';
import * as routes from '/navigation/shop/routes.js';
import type { Basket } from '/types/shop';
import type { State, Dispatch } from '/types';
import { SHOP_API_ORDER_URL } from '/config';

type AutoPassedProps = {|
  navigation: NavigationScreenProp,
|};

type StoreProps = {|
  username?: string,
  total: number,
  basket: Basket,
  canOrder: boolean,
|};

type DispatchProps = {|
  resetBasket: () => void,
|};

type Props = {|
  ...AutoPassedProps,
  ...StoreProps,
  ...DispatchProps,
|};

type LocalState = {
  modalVisible: boolean,
  wrongPin: boolean,
  loading: boolean,
};

class Order extends Component<Props, LocalState> {
  state = {
    modalVisible: false,
    wrongPin: false,
    loading: false,
  };
  
  performOrder( pin: string, fromStorage: boolean ) {
    this.setState( { loading: true } );
    
    if ( !this.props.username ) {
      // This should never happen, but you never know
      toast.warning( 'Please choose your username' );
      this.props.navigation.navigate( routes.USERS );
      return;
    }
    
    const promise = pay( this.props.username, pin, this.props.basket )
      .then( () => {
        this.props.resetBasket();
        toast.success( 'Payment successful!' );
      } )
      .catch( e => {
        if ( e === 403 ) {
          this.openModal( !fromStorage );
        }
        else {
          error( 'Oops! Failed to order your products.' );
        }
      } )
      .finally( () => {
        this.setState( { loading: false } );
      } );
    
    progress( promise )
      .after( 3000, () => {
        toast.warning( 'This is taking longer than usual. Hang tight!' );
      } );
  }
  
  order() {
    AsyncStorage.getItem( 'pin' )
      .then( pin => {
        if ( pin ) {
          this.performOrder( pin, true );
        }
        else {
          this.openModal();
        }
      } );
  }
  
  onPin( pin: string ) {
    this.closeModal();
    this.performOrder( pin, false );
  }
  
  openModal( wrongPin: boolean = false ) {
    this.setState( { modalVisible: true, wrongPin } );
  }
  
  closeModal() {
    this.setState( { modalVisible: false } );
  }
  
  render() {
    return (
      <Footer style={styles.basket}>
        <Text style={styles.total}>€{this.props.total.toFixed( 2 )}</Text>
        {
          this.state.loading ?
            <Spinner color='white' />
            :
            <Button rounded light small
              onPress={this.order.bind( this )}
              disabled={!this.props.canOrder}
              style={styles.payButton}
            >
              <Text>PAY</Text>
            </Button>
        }
        <PinModal
          visible={this.state.modalVisible}
          wrongPin={this.state.wrongPin}
          onCancel={this.closeModal.bind( this )}
          onPin={this.onPin.bind( this )}
        />
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
  payButton: {
    alignSelf: 'center',
  },
} );

function pay( username: string, pin: string, basket: Basket ): Promise<void> {
  return new Promise( ( resolve, reject ) => {
    for ( const [ item_id, amount ] of Object.entries( basket ) ) {
      fetch( SHOP_API_ORDER_URL, {
        method: 'POST',
        headers: new Headers( {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: username + ':' + pin,
        } ),
        body: JSON.stringify( {
          subscription: false,
          item_id,
          amount,
        } ),
      } )
        .then( res => res.ok ? resolve() : reject( res.status ) )
        .catch( () => reject );
    }
  } );
}

function mapStateToProps( state: State ): StoreProps {
  return {
    username: state.shop.username,
    total: state.shop.total,
    canOrder: state.shop.total > 0,
    basket: state.shop.basket,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    resetBasket() {
      dispatch( resetBasket() );
    },
  };
}

export default withNavigation( connect( mapStateToProps, mapDispatchToProps )( Order ) );
