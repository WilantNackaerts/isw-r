// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import { Card, CardItem, Text, Container } from 'native-base';
import Order from '/components/shop/Order.js';
import ClickableIcon from '/components/ClickableIcon.js';
import Loading from '/components/Loading.js';
import PullToRefresh from '/components/PullToRefresh.js';
import { fetchProducts, reloadProducts, orderItem } from '/store/actions/shop';
import type { NavigationScreenProp } from 'react-navigation';
import type { State, Dispatch } from '/types';
import type { Product, Basket } from '/types/shop';

type AutoPassedProps = {|
  navigation: NavigationScreenProp,
|};

type StoreProps = {|
  products: Product[],
  loading: boolean,
  failed: boolean,
  reloading: boolean,
  basket: Basket,
|};

type DispatchProps = {|
  fetchProducts: () => void,
  reloadProducts: () => void,
  orderItem: ( productId: number, amount: 1 | -1 ) => void,
|}

type Props = {|
  ...AutoPassedProps,
  ...StoreProps,
  ...DispatchProps,
|};

class Products extends Component<Props> {
  componentWillMount() {
    this.props.fetchProducts();
    this.props.navigation.addListener( 'didFocus', this.onFocus.bind( this ) );
  }
  
  onFocus() {
    if ( this.props.failed ) {
      this.props.fetchProducts();
    }
  }

  render() {
    if ( this.props.loading || this.props.failed ) {
      return (
        <Loading
          loading={this.props.loading}
          failed={this.props.failed}
          onRetry={this.props.fetchProducts}
          failedMessage='Failed to load products.'
        />
      );
    }

    return (
      <Container>
        <PullToRefresh onRefresh={this.props.reloadProducts} refreshing={this.props.reloading}>
          <View style={styles.cardContainer}>
            {
              this.props.products.map( product => (
                <Card key={product.id} style={styles.product}>
                  <CardItem button cardBody style={styles.cardContent} onPress={() => this.props.orderItem( product.id, 1 )}>
                    <Image
                      source={{ uri: product.image }}
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
        </PullToRefresh>
        <Order />
      </Container>
    );
  }
}

const styles = StyleSheet.create( {
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

function mapStateToProps( state: State ): StoreProps {
  return {
    products: state.shop.products,
    loading: state.shop.loadingProducts,
    failed: state.shop.loadProductsFailed,
    reloading: state.shop.reloadingProducts,
    basket: state.shop.basket,
  };
}

function mapDispatchToProps( dispatch: Dispatch ): DispatchProps {
  return {
    fetchProducts() {
      dispatch( fetchProducts() );
    },
    reloadProducts() {
      dispatch( reloadProducts() );
    },
    orderItem( productId: number, amount: 1 | -1 ) {
      dispatch( orderItem( productId, amount ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Products );
