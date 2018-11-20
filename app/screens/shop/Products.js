// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Card, CardItem, Spinner } from 'native-base';
import { fetchProducts } from '/store/actions/shop';
import type { NavigationScreenProp } from 'react-navigation';
import type { State, Dispatch } from '/types';
import type { Product } from '/types/shop';

type Props = {
  products: Product[],
  loadingProducts: boolean,
  navigation: NavigationScreenProp,
  fetchProducts: () => void,
};

class Products extends Component<Props> {
  componentDidMount() {
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

    console.log( this.props.products[ 0 ].image.replace( 'https://10.0.2.2:3050/storage', 'http://10.0.2.2:3050/shop/storage' ) );
    return (
      <ScrollView>
        <View style={styles.container}>
          {
            this.props.products.map( product => (
              <Card key={product.id} style={styles.product}>
                <CardItem cardBody style={styles.cardContent}>
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
    );
  }
}

const styles = StyleSheet.create( {
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  container: {
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
} );

function mapStateToProps( state: State ) {
  return {
    products: state.shop.products,
    loadingProducts: state.shop.loadingProducts,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchProducts() {
      dispatch( fetchProducts() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Products );
