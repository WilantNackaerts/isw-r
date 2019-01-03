// @flow

import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Modal } from 'react-native';
import { View, Button, Text } from 'native-base';
import CheckBox from 'react-native-check-box';
import PinInput from 'react-native-code-input';
import { withNavigation } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';

type Props = {
  visible: boolean,
  wrongPin: boolean,
  navigation: NavigationScreenProp,
  onCancel: () => void,
  onPin: ( pin: string ) => void,
}

type LocalState = {
  rememberPin: boolean,
};

class PinModal extends Component<Props, LocalState> {
  state = {
    rememberPin: false,
  };
  
  setPin( pin: string ) {
    if ( /^[0-9]{4}$/.test( pin ) ) {
      if ( this.state.rememberPin ) {
        AsyncStorage.setItem( 'pin' , pin )
          .then( () => {
            this.props.onPin( pin );
          } );
      }
      else {
        this.props.onPin( pin );
      }
    }
  }
  
  toggleRememberPin( ...args ) {
    this.setState( {
      rememberPin: !this.state.rememberPin,
    } );
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent
        onRequestClose={this.props.onCancel}
      >
        <View style={styles.container}>
          <View style={styles.view}>
            {this.props.wrongPin && <Text style={styles.wrongPin}>Wrong PIN! Try again.</Text>}
            <PinInput
              secureTextEntry
              codeLength={4}
              borderType='underline'
              activeColor='rgba(0, 0, 0, 1)'
              inactiveColor='rgba(0, 0, 0, 0.5)'
              space={10}
              size={50}
              inputPosition='center'
              onFulfill={this.setPin.bind( this )}
              containerStyle={styles.input}
              autoFocus
            />
            <View style={styles.controls}>
              <CheckBox
                style={styles.checkbox}
                rightText='Remember'
                isChecked={this.state.rememberPin}
                onClick={this.toggleRememberPin.bind( this )}
                checkBoxColor='#3F51B5'
              />
              <Button small onPress={this.props.onCancel}>
                <Text>Cancel</Text>
              </Button>
            </View>
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
  wrongPin: {
    color: 'red',
  },
  input: {
    flex: 0,
  },
  controls: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    flex: 1,
  },
} );

export default withNavigation( PinModal );
