// @flow

import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Modal } from 'react-native';
import { View, Button, Text } from 'native-base';
import PinInput from 'react-native-code-input';
import type { NavigationScreenProp } from 'react-navigation';
import { PRODUCTS } from '/navigation/shop/routes';

type Props = {
  modalVisible: boolean,
  navigation: NavigationScreenProp,
  close: () => void,
}

type State = {
  pin: string,
}

export default class PinModal extends Component<Props, State> {
  state = {
    pin: '',
  }

  async setPin( pin: string ) {
    if ( /^[0-9]{4}$/.test( pin ) ) {
      await AsyncStorage.setItem( 'pin' , pin );
      const username = await AsyncStorage.getItem( 'username' );
      this.props.navigation.navigate( PRODUCTS, { username } );
      this.props.close();
    }
  }

  checkPin() {
    const pin = this.state.pin;
    if ( /^[0-9]{4}$/.test( pin ) ) {
      return pin;
    } else {
      console.error();
    }
  }

  render() {
    return (
      <Modal
        //visible={this.props.modalVisible}
        visible
        transparent
        onRequestClose={this.props.close}
      >
        <View style={styles.container}>
          <View style={styles.view}>
            <PinInput
              secureTextEntry
              codeLength={4}
              borderType={'underline'}
              activeColor='rgba(0, 0, 0, 1)'
              inactiveColor='rgba(0, 0, 0, 0.5)'
              space={10}
              size={50}
              inputPosition='center'
              onFulfill={this.setPin.bind( this )}
              containerStyle={styles.input}
            />
            <Button small onPress={this.props.close} style={styles.button}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  view: {
    color: 'black',
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    flex: 0,
  },
  button: {
    marginTop: 30,
    alignSelf: 'flex-end',
  },
} );
