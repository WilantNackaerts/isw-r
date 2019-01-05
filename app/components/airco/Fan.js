// @flow

import React, { Component } from 'react';
import { Button, Text } from 'native-base';
import Slider from './Slider.js';

type LocalState = {|
  auto: boolean,
  power: number,
|};

type Props = {|
  
|};

export default class Fan extends Component<Props, LocalState> {
  state = {
    auto: false,
    power: 2,
  };
  
  setPower( power: number ) {
    this.setState( { power } );
  }
  
  toggleAuto() {
    this.setState( { auto: !this.state.auto } );
  }
  
  render() {
    return (
      <Slider
        iconName='fan'
        iconType='MaterialCommunityIcons'
        min={1}
        max={4}
        value={this.state.power}
        control={
          <Button small block bordered={!this.state.auto} onPress={this.toggleAuto.bind( this )}>
            <Text uppercase>Auto</Text>
          </Button>
        }
        onChange={this.setPower.bind( this )}
      />
    );
  }
}
