// @flow

import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Modal } from 'react-native';
import { View, Button, Text } from 'native-base';
import PinInput from 'react-native-code-input';
import { withNavigation } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';

type Props = {
  visible: boolean,
  navigation: NavigationScreenProp,
  onCancel: () => void,
  onPin: ( pin: string ) => void,
}

class PinModal extends Component<Props> {
  setPin( pin: string ) {
    if ( /^[0-9]{4}$/.test( pin ) ) {
      AsyncStorage.setItem( 'pin' , pin )
        .then( () => {
          this.props.onPin( pin );
        } );
    }
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
            <Button small onPress={this.props.onCancel} style={styles.button}>
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

export default withNavigation( PinModal );
