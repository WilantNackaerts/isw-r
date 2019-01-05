// @flow

import React, { Component, type Node } from 'react';
import { StyleSheet, Slider } from 'react-native';
import { View, Icon } from 'native-base';

type PassedProps = {|
  iconName: string,
  iconType ?: string,
  min: number,
  max: number,
  value: number,
  control: Node,
  onChange: ( value: number ) => void,
|};

type DefaultProps = {|
  step: number,
  first: boolean,
  disabled: boolean,
|};

type Props = {|
  ...PassedProps,
  ...DefaultProps,
|};

export default class Temperature extends Component<Props> {
  static defaultProps: DefaultProps = {
    step: 1,
    first: false,
    disabled: false,
  }
  
  render() {
    return (
      <View style={this.props.first ? styles.container_first : styles.container}>
        <Icon name={this.props.iconName} type={this.props.iconType} style={styles.icon} />
        <View style={styles.controls}>
          <View style={styles.control}>
            {this.props.control}
          </View>
          <View style={styles.slider}>
            <Slider
              minimumValue={this.props.min}
              maximumValue={this.props.max}
              value={this.props.value}
              step={this.props.step}
              disabled={this.props.disabled}
              thumbTintColor='#3F51B5'
              minimumTrackTintColor='#3F51B5'
              onValueChange={this.props.onChange}
              style={styles.slider}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  container_first: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    color: '#3F51B5',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  control: {
    width: 70,
    marginRight: 10,
  },
  slider: {
    flex: 1,
  },
} );
