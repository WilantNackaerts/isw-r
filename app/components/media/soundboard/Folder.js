// @flow

import React, { Component } from 'react';
import { Text, View } from 'native-base';
import type { Item } from '/types/media/soundboard'; 

type Props = {
  folder: Item,
}

export default class Folder extends Component<Props> {

  render() {
    return (
      <View>
        <Text>{this.props.folder.name}</Text>
      </View>
    );
  }
}
