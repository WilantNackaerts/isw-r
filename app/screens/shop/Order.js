// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Text, Container, List, ListItem, Button, Footer, Left, Right } from 'native-base';
import { SHOP_API_ORDER_URL } from '/config';
import { TEXT, FOOTER } from '/styles';
import { PRODUCTS } from '/navigation/shop/routes';
import type { NavigationScreenProp } from 'react-navigation';
import type { State, Dispatch } from '/types';
import type { Product, Basket } from '/types/shop';

type Props = {
  loading: boolean,
  navigation: NavigationScreenProp,
  productsById: Product[],
  basket: Basket,
  total: number,
}

class Order extends Component<Props> {

  async order() {
    const username = await AsyncStorage.getItem( 'username' );
    const pin = await AsyncStorage.getItem( 'pin' );
    for ( const [ item_id, amount ] of Object.entries( this.props.basket ) ) {
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
        .then( console.log );
    }
    this.props.navigation.navigate( PRODUCTS, { username } );
  }


  render() {
    return (
      <Container>
        <List dataArray={Object.keys( this.props.basket )} 
          renderRow={( id ) =>
            <ListItem>
              <Left>
                <Text>{this.props.productsById[ id ].name}: </Text>
                <Text>€ {this.props.productsById[ id ].price * this.props.basket[ id ]} </Text>
              </Left>
              <Right>
                <Text>amount: {this.props.basket[ id ]}</Text>
              </Right>
            </ListItem>
          } />
        <Footer style={styles.footer}>
          <Left>
            <Text style={styles.total}>€ {Math.round( this.props.total*100 )/100}</Text>
          </Left>
          <Right>
            <Button rounded success style={styles.payButton} onPress={this.order.bind( this )}>
              <Text style={styles.payText}>Pay</Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create( {
  payButton: {
    padding: 5,
  },
  payText: {
    ...TEXT,
    fontSize: 20,
  },
  total: {
    ...TEXT,
    fontSize: 25,
  },
  footer: {
    ...FOOTER,
  },
} );

function mapStateToProps( state: State ) {
  return {
    basket: state.shop.basket,
    productsById: state.shop.productsById,
    total: state.shop.total,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Order );
