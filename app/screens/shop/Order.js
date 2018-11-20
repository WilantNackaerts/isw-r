// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Container, List, ListItem, Button, Footer, Left, Right } from 'native-base';
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
  render() {
    return (
      <Container>
        <List dataArray={Object.keys( this.props.basket )} 
          renderRow={( id ) =>
            <ListItem>
              <Text>{this.props.productsById[ id ].name}</Text>
              <Text>{this.props.productsById[ id ].price * this.props.basket[ id ]}</Text>
            </ListItem>
          } />
        <Footer>
          <Left>
            <Button rounded success>
              <Text>Pay</Text>
            </Button>
          </Left>
          <Right>
            <Text>{this.props.total}</Text>
          </Right>
        </Footer>
      </Container>
    );
  }
}

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
