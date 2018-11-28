// @flow

import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import Modal from 'react-native-modal';
import { View, Form, Item, Label, Button, Text, Input } from 'native-base';
import type { NavigationScreenProp } from 'react-navigation';
import { PRODUCTS } from '/navigation/shop/routes';

type Props = {
  modalVisible: boolean,
  navigation: NavigationScreenProp,
  close: () => void,
}

export default class PinModal extends Component<Props> {

  async setPin() {
    // AsyncStorage.setItem( 'pin' ,  );
    const username = await AsyncStorage.getItem( 'username' );
    this.props.navigation.navigate( PRODUCTS, { username } );
    this.props.close();
  }

  render() {
    // const deviceWidth = Dimensions.get( 'window' ).width;
    // const deviceHeight = Platform.OS === 'ios' 
    //   ? Dimensions.get( 'window' ).height
    //   : require( 'react-native-extra-dimensions-android' ).get( 'REAL_WINDOW_HEIGHT' );

    return (
      <Modal
        style={styles.modal}
        visible={this.props.modalVisible}
        onRequestClose={this.props.close}
        // deviceWidth={deviceWidth}
        // deviceHeight={deviceHeight}
      >
        <View style={styles.view}>
          <Form>
            <Item stackedLabel>
              <Label>Pin</Label>
              <Input
                // secureTextEntry
              />
            </Item>
            <View style={styles.viewButton}>
              <Button style={styles.button} onPress={this.props.close}>
                <Text>Cancel</Text>
              </Button>
              <Button style={styles.button} onPress={this.setPin.bind( this )}>
                <Text>Ok</Text>
              </Button>
            </View>
          </Form>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create( {
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  view: {
    color: 'black',
    backgroundColor: 'white',
  },
  viewButton: {
    flexDirection: 'row',
  },
  button: {
    margin: 30,
  },
} );
