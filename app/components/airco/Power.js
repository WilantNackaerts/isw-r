// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Icon, Button } from 'native-base';

type Props = {|
  
|};

type LocalState = {|
  poweredOn: boolean,
|};

export default class Power extends Component<Props, LocalState> {
  state = {
    poweredOn: false,
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Button
          vertical rounded danger
          bordered={!this.state.poweredOn}
          onPress={()=>this.setState( { poweredOn: !this.state.poweredOn } )}
          style={styles.button}
        >
          <Icon name='power' />
        </Button>
        <Text style={styles.label}>{this.state.poweredOn ? 'On' : 'Off'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    flexGrow: 0,
    alignSelf: 'center',
    width: 60,
    height: 60,
  },
  label: {
    color: '#d9534f',
    marginTop: 5,
  },
} );
