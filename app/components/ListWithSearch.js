// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import Search from './Search';
import { List } from 'native-base';

type Props<T> = $Shape<$PropertyType<List<T>, 'props'>> & {
  onChange: ( term: string ) => void
};

export default class ListWithSearch<T> extends Component<Props<T>> {
  render() {
    return (
      <View>
        <Search onChange={this.props.onChange} />
        <List {...this.props} />
      </View>
    );
  }
}
