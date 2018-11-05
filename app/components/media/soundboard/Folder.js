// @flow

import React, { Component } from 'react';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import { SOUNDBOARD } from '/navigation/soundboard/routes';
import type { Item } from '/types/media/soundboard';
import type { NavigationScreenProp } from 'react-navigation';

type Props = {
  folder: Item,
  navigation: NavigationScreenProp,
}

class Folder extends Component<Props> {
  select() {
    console.log( this.props.navigation );
    this.props.navigation.push( SOUNDBOARD, {
      prefix: this.props.folder.path + '/',
    } );
  }

  render() {
    return (
      <ListItem onPress={this.select.bind( this )}>
        <Left>
          <Text>{this.props.folder.name}</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}

export default withNavigation( Folder );
