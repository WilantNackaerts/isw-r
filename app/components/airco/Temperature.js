// @flow

import React, { Component } from 'react';
import { Text } from 'native-base';
import Slider from './Slider.js';

type State = {|
  temp: number,
|};

type Props = {|
  
|};

export default class Temperature extends Component<Props, State> {
  state = {
    temp: 21,
  };
  
  setTemp( temp: number ) {
    this.setState( { temp } );
  }
  
  render() {
    return (
      <Slider
        first
        iconName='thermometer'
        min={18}
        max={32}
        value={this.state.temp}
        control={
          <Text>{this.state.temp}°C</Text>
        }
        onChange={this.setTemp.bind( this )}
      />
    );
  }
}
