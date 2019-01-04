// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Spinner } from 'native-base';

type Props = {
  loading: boolean,
  failed: boolean,
  failedMessage: string,
  retryMessage: string,
  small: boolean,
  onRetry: () => void,
};

export default class Loading extends Component<Props> {
  static defaultProps = {
    retryMessage: 'Retry',
    small: false,
  };
  
  render() {
    if ( this.props.loading ) {
      return (
        <View style={styles.container}>
          <Spinner color='blue' />
        </View>
      );
    }
    
    return (
      <View style={styles.container}>
        <Text>{this.props.failedMessage}</Text>
        <Button rounded small={this.props.small} onPress={this.props.onRetry} style={styles.button}>
          <Text>{this.props.retryMessage}</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
  },
} );
