// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, ScrollView, AsyncStorage } from 'react-native';
import { Card, CardItem, Spinner, Footer, Text, Container, Left, Icon, Right, Body, Button, Toast } from 'native-base';
// import ClickableIcon from '/components/ClickableIcon';
import { fetchProducts, orderItem, pay } from '/store/actions/shop';
import { TEXT, FOOTER } from '/styles';
import { USERS } from '/navigation/shop/routes';
import type { NavigationScreenProp } from 'react-navigation';
import type { State, Dispatch } from '/types';
import type { Product, Basket } from '/types/shop';

type Props = {
  products: Product[],
  loadingProducts: boolean,
  total: number,
  canOrder: boolean,
  navigation: NavigationScreenProp,
  basket: Basket,
  fetchProducts: () => void,
  orderItem: ( productId: number, amount: 1 | -1 ) => void,
  pay: ( username: string, pin: string, basket: Basket ) => void,
};

type LocalState = {
  username: string,
  pin: string,
}

class Products extends Component<Props, LocalState> {

  state = {
    username: '',
    pin: '',
  }

  async componentWillMount() {
    this.setState( {
      username: await AsyncStorage.getItem( 'username' ),
      pin: await AsyncStorage.getItem( 'pin' ),
    } );

    if ( this.state.username == null && this.state.pin == null ) {
      this.props.navigation.navigate( USERS );
    }
    this.props.navigation.setParams( { 'username': this.state.username } );
  }

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
                  <CardItem footer >
                    <Left>
                      <Icon name='remove' 
                        onPress={() => this.props.basket[ product.id ] > 0 && this.props.orderItem( product.id, -1 )}
                      />
                    </Left>
                    <Body>
                      <Text>{this.props.basket[ product.id ] || 0}</Text>
                    </Body>
                    <Right>
                      <Icon name='add' 
                        onPress={() => this.props.orderItem( product.id, 1 )}
                      />
                    </Right>
                  </CardItem>
                </Card>
              ) )
            }
          </View>
        </ScrollView>
        <Footer style={styles.basket}>
          <Text style={styles.total}>€{this.props.total.toFixed( 2 )}</Text>
          {/* <ClickableIcon
            name='send'
            onPress={this.order.bind( this )}
            enabled={this.props.canOrder}
          /> */}
          <Button rounded success
            onPress={() => {
              this.props.pay( this.state.username, this.state.pin, this.props.basket );
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
    pay( username: string, pin: string, basket: Basket ) {
      dispatch( pay( username, pin, basket ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Products );