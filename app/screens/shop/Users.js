// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Spinner } from 'native-base';
import { PRODUCTS } from '/navigation/shop/routes';
import { fetchUsers } from '/store/actions/shop';
import type { NavigationScreenProp } from 'react-navigation';
import type { User } from '/types/shop';
import type { State, Dispatch } from '/types';

type Props = {
  users: User[],
  loading: boolean,
  navigation: NavigationScreenProp,
  fetchUsers(): void,
};

class Users extends Component<Props> {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    if ( this.props.loading ) {
      return (
        <View style={styles.spinner}>
          <Spinner color='blue' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>{this.props.users.map( user => user.username ).join( ', ' )}</Text>
        <Button onPress={() => this.props.navigation.navigate( PRODUCTS )}>
          <Text>Go to products</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
} );

function mapStateToProps( state: State ) {
  return {
    loading: state.shop.loadingUsers,
    users: state.shop.users,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchUsers() {
      dispatch( fetchUsers() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Users );
