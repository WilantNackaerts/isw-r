// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';
import Slider from './Slider.js';
import { toggleFanAuto, setFanPower } from '/store/actions/airco.js';
import type { State, Dispatch } from '/types';

type StoreProps = {|
  auto: boolean,
  power: number,
|};

type DispatchProps = {|
  toggleAuto: () => void,
  setPower: ( power: number ) => void,
|};

type Props = {|
  ...StoreProps,
  ...DispatchProps,
|};

class Fan extends Component<Props> {
  render() {
    return (
      <Slider
        iconName='fan'
        iconType='MaterialCommunityIcons'
        min={1}
        max={4}
        value={this.props.power}
        disabled={this.props.auto}
        control={
          <Button small block bordered={!this.props.auto} onPress={this.props.toggleAuto}>
            <Text uppercase>Auto</Text>
          </Button>
        }
        onChange={this.props.setPower}
      />
    );
  }
}

function mapStateToProps( state: State ): StoreProps {
  return {
    auto: state.airco.fanAuto,
    power: state.airco.fanPower,
  };
}

function mapDispatchToProps( dispatch: Dispatch ): DispatchProps {
  return {
    toggleAuto() {
      dispatch( toggleFanAuto() );
    },
    setPower( temp: number ) {
      dispatch( setFanPower( temp ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Fan );
