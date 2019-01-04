// @flow

import React, { Component } from 'react';
import { StyleSheet, Modal, TextInput, AsyncStorage } from 'react-native';
import { View, Button, Text } from 'native-base';
import CheckBox from 'react-native-check-box';
import { btoa } from 'Base64';

type Props = {
  visible: boolean,
  wrongCre: boolean,
  onCancel: () => void,
  onCredentials: ( credentials: string ) => void,
}

type LocalState = {
  rememberCre: boolean,
  username: string,
  password: string,
};

export default class CamModal extends Component<Props, LocalState> {
  state = {
    rememberCre: false,
    username: '',
    password: '',
  };

  setCredentials() {
    let credentials = btoa( this.state.username + ':' + this.state.password );
    if ( this.state.rememberCre ) {
      AsyncStorage.setItem( 'credentials', credentials )
        .then( () => {
          this.props.onCredentials( credentials );
        } );
    } else {
      this.props.onCredentials( credentials );
    }
  }
  
  toggleRememberCre() {
    this.setState( {
      rememberCre: !this.state.rememberCre,
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
            {this.props.wrongCre && <Text style={styles.wrongPin}>Wrong credentials! Try again.</Text>}
            <TextInput
              secureTextEntry
              placeholder='username'
              onChangeText={( username )=>this.setState( { username } )}
              maxLength={20}
              style={styles.input}
              autoFocus
            />
            <TextInput
              secureTextEntry
              placeholder='password'
              onChangeText={( password )=>this.setState( { password } )}
              maxLength={20}
              style={styles.input}
            />
            <CheckBox
              style={styles.checkbox}
              rightText='Remember'
              isChecked={this.state.rememberCre}
              onClick={this.toggleRememberCre.bind( this )}
              checkBoxColor='#3F51B5'
            />
            <View style={styles.controls}>
              <Button small onPress={this.props.onCancel} style={styles.button}>
                <Text>Cancel</Text>
              </Button>
              <Button small onPress={this.setCredentials.bind( this )} style={styles.button}>
                <Text>Login</Text>
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
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    flex: 0,
  },
  button:{
    margin: 10,
  },
} );

