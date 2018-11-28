// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Text, Spinner, ListItem, Container } from 'native-base';
import { fetchUsers } from '/store/actions/shop';
import PinModal from '/components/shop/PinModal';
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

type LocalState = {
  modalVisible: boolean,
}

class Users extends Component<Props, LocalState> {
  state = {
    modalVisible: false,
  }
  componentDidMount() {
    this.props.fetchUsers();
  }

  selectUser( username: string ) {
    this.setState( { modalVisible: true } );
    AsyncStorage.setItem( 'username', username );
  }

  closeModal() {
    this.setState( { modalVisible: false } );
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
        <PinModal close={this.closeModal.bind( this )} navigation={this.props.navigation} modalVisible={this.state.modalVisible} />
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
