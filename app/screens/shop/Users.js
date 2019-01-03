// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Text, Spinner, ListItem, Container } from 'native-base';
import FilterList from '/components/FilterList';
import { fetchUsers, setUsername } from '/store/actions/shop';
import * as routes from '/navigation/shop/routes.js';
import type { NavigationScreenProp } from 'react-navigation';
import type { User } from '/types/shop';
import type { State, Dispatch } from '/types';


type Props = {
  username: string,
  users: User[],
  loading: boolean,
  navigation: NavigationScreenProp,
  fetchUsers(): void,
  setUsername: ( username: string ) => void,
};

class Users extends Component<Props> {
  componentDidMount() {
    if ( this.props.navigation.getParam( 'force', false ) ) {
      this.props.fetchUsers();
      return;
    }
    
    if ( this.props.username ) {
      this.done();
      return;
    }
    
    AsyncStorage.getItem( 'username' )
      .then( username => {
        if ( username ) {
          this.props.setUsername( username );
          this.done();
        }
        else {
          this.props.fetchUsers();
        }
      } );
  }

  selectUser( username: string ) {
    AsyncStorage.setItem( 'username', username )
      .then( () => this.props.setUsername( username ) )
      .then( () => this.done( false ) );
  }
  
  done( replace: boolean = true ) {
    if ( replace ) {
      this.props.navigation.replace( routes.PRODUCTS );
    }
    else {
      this.props.navigation.navigate( routes.PRODUCTS );
    }
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
    username: state.shop.username,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchUsers() {
      dispatch( fetchUsers() );
    },
    setUsername( username: string ) {
      dispatch( setUsername( username ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Users );
