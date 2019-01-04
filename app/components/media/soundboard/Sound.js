// @flow

import React, { Component } from 'react';
import { Text, ListItem } from 'native-base';
import { SOUNDBOARD_URL } from '/config';
import { catcher } from '/util/error.js';
import type { Item } from '/types/media/soundboard'; 

type Props = {
  sound: Item,
}

export default class Sound extends Component<Props> {
  onPress() {
    fetch( SOUNDBOARD_URL + '/' + this.props.sound.path )
      .catch( catcher( 'Oops! Failed to play sound effect.' ) );
  }

  render() {
    return (
      <ListItem>
        <Text onPress={this.onPress.bind( this )}>
          {this.props.sound.label}
        </Text>
      </ListItem>
    );
  }

}
