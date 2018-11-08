// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';

type Props = {
  style?: any,
  name: string,
  enabled: boolean,
  enabledStyle?: any,
  disabledStyle?: any,
  onPress: () => void,
};

export default class ClickableIcon extends Component<Props> {
  render() {
    return (
      <Icon
        name={this.props.name}
        onPress={this.props.enabled ? this.props.onPress : null}
        style={StyleSheet.flatten( [
          this.props.style,
          this.props.enabled ? this.props.enabledStyle : this.props.disabledStyle,
        ] )}
      />
    );
  }
}
