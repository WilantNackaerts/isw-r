// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import Slider from './Slider.js';
import { setTemp } from '/store/actions/airco.js';
import type { State, Dispatch } from '/types';

type StoreProps = {|
  temp: number,
|};

type DispatchProps = {|
  setTemp: ( temp: number ) => void
|};

type Props = {|
  ...StoreProps,
  ...DispatchProps,
|};

class Temperature extends Component<Props> {
  render() {
    return (
      <Slider
        first
        iconName='thermometer'
        min={18}
        max={32}
        value={this.props.temp}
        control={
          /*<Text style={styles.control}>{this.props.temp}°C</Text>*/
          <View style={styles.control}>
            <Text style={styles.temp}>{this.props.temp}</Text>
            <Text style={styles.unit}>°C</Text>
          </View>
        }
        onChange={this.props.setTemp}
      />
    );
  }
}

const styles = StyleSheet.create( {
  control: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    color: '#555',
    fontSize: 24,
  },
  unit: {
    color: '#555',
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 15,
  },
} );

function mapStateToProps( state: State ): StoreProps {
  return {
    temp: state.airco.temp,
  };
}

function mapDispatchToProps( dispatch: Dispatch ): DispatchProps {
  return {
    setTemp( temp: number ) {
      dispatch( setTemp( temp ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Temperature );
