// @flow

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import Search from './Search';

type Props<T> = $Shape<$PropertyType<FlatList<T>, 'props'>> & {
  onChange: ( term: string ) => void
};

export default class ListWithSearch<T> extends Component<Props<T>> {
  render() {
    return (
      <View>
        <Search onChange={this.props.onChange} />
        <FlatList {...this.props} />
      </View>
    );
  }
}
