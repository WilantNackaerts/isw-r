// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Spinner, ListItem, Container } from 'native-base';
import { PRODUCTS } from '/navigation/shop/routes';
import { fetchUsers } from '/store/actions/shop';
import type { NavigationScreenProp } from 'react-navigation';
import type { User } from '/types/shop';
import FilterList from '/components/FilterList';
import type { State, Dispatch } from '/types';

type Props = {
  users: User[],
  loading: boolean,
  navigation: NavigationScreenProp,
  fetchUsers(): void,
};

class Users extends Component<Props> {
  componentDidMount() {
    this.props.fetchUsers();
  }

  selectUser( username: string ) {
    this.props.navigation.navigate( PRODUCTS, { username } );
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
      <Container>
        <FilterList
          data={this.props.users}
          filterProp='username'
          keyExtractor={user => user.username}
          renderItem={( { item: user } ) => (
            <ListItem onPress={() => this.selectUser( user.username )} key={user.username}>
              <Text>{user.username}</Text>
            </ListItem>
          )}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create( {
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
