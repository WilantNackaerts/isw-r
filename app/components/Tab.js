// @flow

import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';
import { Navigation } from 'react-navigation';

type Props = {
  icon: string,
  label: string,
  routeName: string,
  navigation: Navigation
};

export default class Tab extends Component<Props> {
  render() {
    const nav = this.props.navigation;
    const currentRouteName = nav.state.routes[ nav.state.index ].routeName;

    return (
      <Button
        vertical
        active={currentRouteName === this.props.routeName}
        onPress={() => this.props.navigation.navigate( this.props.routeName )}>
        <Icon name={this.props.icon} />
        <Text>{this.props.label}</Text>
      </Button>
    );
  }
}
