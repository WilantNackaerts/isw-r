// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Text, ListItem } from 'native-base';
import FilterList from '/components/FilterList';
import Loading from '/components/Loading.js';
import PullToRefresh from '/components/PullToRefresh.js';
import { fetchUsers, reloadUsers, setUsername } from '/store/actions/shop';
import * as routes from '/navigation/shop/routes.js';
import { catcher } from '/util/error.js';
import type { NavigationScreenProp } from 'react-navigation';
import type { User } from '/types/shop';
import type { State, Dispatch } from '/types';


type Props = {
  username: string,
  users: User[],
  loading: boolean,
  failed: boolean,
  reloading: boolean,
  navigation: NavigationScreenProp,
  fetchUsers: () => void,
  reloadUsers: () => void,
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
      } )
      .catch( () => this.props.fetchUsers() );
  }

  selectUser( username: string ) {
    AsyncStorage.setItem( 'username', username )
      .then( () => this.props.setUsername( username ) )
      .then( () => this.done( false ) )
      .catch( catcher( 'Oops! Failed to save username.' ) );
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
    if ( this.props.loading || this.props.failed ) {
      return (
        <Loading
          loading={this.props.loading}
          failed={this.props.failed}
          onRetry={this.props.fetchUsers}
          failedMessage='Failed to load users.'
        />
      );
    }

    return (
      <PullToRefresh onRefresh={this.props.reloadUsers} refreshing={this.props.reloading}>
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
      </PullToRefresh>
    );
  }
}

function mapStateToProps( state: State ) {
  return {
    loading: state.shop.loadingUsers,
    failed: state.shop.loadUsersFailed,
    reloading: state.shop.reloadingUsers,
    users: state.shop.users,
    username: state.shop.username,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchUsers() {
      dispatch( fetchUsers() );
    },
    reloadUsers() {
      dispatch( reloadUsers() );
    },
    setUsername( username: string ) {
      dispatch( setUsername( username ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Users );
