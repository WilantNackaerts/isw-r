// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Text, Icon, Button } from 'native-base';
import { togglePower } from '/store/actions/airco.js';
import type { State, Dispatch } from '/types';

type StoreProps = {|
  poweredOn: boolean,
|};

type DispatchProps = {|
  togglePower: () => void,
|};

type Props = {|
  ...StoreProps,
  ...DispatchProps,
|};

class Power extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button
          vertical rounded danger
          bordered={!this.props.poweredOn}
          onPress={this.props.togglePower}
          style={styles.button}
        >
          <Icon name='power' />
        </Button>
        <Text style={styles.label}>{this.props.poweredOn ? 'On' : 'Off'}</Text>
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

function mapStateToProps( state: State ): StoreProps {
  return {
    poweredOn: state.airco.poweredOn,
  };
}

function mapDispatchToProps( dispatch: Dispatch ): DispatchProps {
  return {
    togglePower() {
      dispatch( togglePower() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Power );
