// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, ScrollView, AsyncStorage } from 'react-native';
import { Card, CardItem, Spinner, Footer, Text, Container } from 'native-base';
import ClickableIcon from '/components/ClickableIcon';
import { fetchProducts, orderItem } from '/store/actions/shop';
import { TEXT, FOOTER } from '/styles';
import { ORDER, USERS } from '/navigation/shop/routes';
import type { NavigationScreenProp } from 'react-navigation';
import type { State, Dispatch } from '/types';
import type { Product } from '/types/shop';

type Props = {
  products: Product[],
  loadingProducts: boolean,
  total: number,
  canOrder: boolean,
  navigation: NavigationScreenProp,
  fetchProducts: () => void,
  orderItem: ( productId: number, amount: 1 | -1 ) => void,
};

class Products extends Component<Props> {

  async componentWillMount() {
    const username = await AsyncStorage.getItem( 'username' );
    const pin = await AsyncStorage.getItem( 'pin' );
    console.log( username, pin );
    if ( !!username && !!pin ) {
      this.props.navigation.navigate( USERS );
    }
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  order() {
    this.props.navigation.navigate( ORDER, {
      username: this.props.navigation.getParam( 'username', '' ),
    } );
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
                </Card>
              ) )
            }
          </View>
        </ScrollView>
        <Footer style={styles.basket}>
          <Text style={styles.total}>€{this.props.total.toFixed( 2 )}</Text>
          <ClickableIcon
            name='send'
            onPress={this.order.bind( this )}
            enabled={this.props.canOrder}
          />
        </Footer>
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
    products: state.shop.products,
    loadingProducts: state.shop.loadingProducts,
    total: state.shop.total,
    canOrder: state.shop.total > 0,
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
