// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Card, CardItem, Spinner, Text, Container } from 'native-base';
import Order from '/components/shop/Order.js';
import ClickableIcon from '/components/ClickableIcon.js';
import { fetchProducts, orderItem } from '/store/actions/shop';
import type { NavigationScreenProp } from 'react-navigation';
import type { State, Dispatch } from '/types';
import type { Product, Basket } from '/types/shop';

type Props = {
  username: string,
  products: Product[],
  loadingProducts: boolean,
  navigation: NavigationScreenProp,
  basket: Basket,
  fetchProducts: () => void,
  orderItem: ( productId: number, amount: 1 | -1 ) => void,
};

class Products extends Component<Props> {
  componentWillMount() {
    this.props.fetchProducts();
  }

  render() {
    if ( this.props.loadingProducts ) {
      return (
        <View style={styles.loading}>
          <Spinner color='blue' />
        </View>
      );
    }

    return (
      <Container>
        <ScrollView>
          <View style={styles.cardContainer}>
            {
              this.props.products.map( product => (
                <Card key={product.id} style={styles.product}>
                  <CardItem button cardBody style={styles.cardContent} onPress={() => this.props.orderItem( product.id, 1 )}>
                    <Image
                      source={{ uri: product.image.replace( 'https://10.0.2.2:3050/storage', 'http://10.0.2.2:3050/shop/storage' ) }}
                      style={styles.image}
                    />
                  </CardItem>
                  <CardItem footer style={styles.footer}>
                    <ClickableIcon name='remove'
                      onPress={() => this.props.orderItem( product.id, -1 )}
                      enabled={( this.props.basket[ product.id ] || 0 ) > 0}
                      enabledStyle={styles.iconEnabled}
                      disabledStyle={styles.iconDisabled}
                    />
                    <Text style={styles.amount}>{this.props.basket[ product.id ] || 0}</Text>
                    <ClickableIcon name='add'
                      onPress={() => this.props.orderItem( product.id, 1 )}
                      enabled={( this.props.basket[ product.id ] || 0 ) < 10}
                      style={styles.iconRight}
                      enabledStyle={styles.iconEnabled}
                      disabledStyle={styles.iconDisabled}
                    />
                  </CardItem>
                </Card>
              ) )
            }
          </View>
        </ScrollView>
        <Order />
      </Container>
    );
  }
}

const styles = StyleSheet.create( {
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  cardContent: {
    flex: 1,
    alignItems: 'stretch',
  },
  product: {
    flexBasis: 100,
    flexShrink: 0,
    flexGrow: 1,
    height: 150,
    alignItems: 'stretch',
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
  },
  footer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    flex: 1,
    textAlign: 'center',
  },
  iconEnabled: {
    color: 'black',
  },
  iconDisabled: {
    color: '#bbb',
  },
  iconRight: {
    textAlign: 'right',
  },
} );

function mapStateToProps( state: State ) {
  return {
    products: state.shop.products,
    loadingProducts: state.shop.loadingProducts,
    total: state.shop.total,
    canOrder: state.shop.total > 0,
    basket: state.shop.basket,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchProducts() {
      dispatch( fetchProducts() );
    },
    orderItem( productId: number, amount: 1 | -1 ) {
      dispatch( orderItem( productId, amount ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Products );
