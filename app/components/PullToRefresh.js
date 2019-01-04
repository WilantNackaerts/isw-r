// @flow

import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

export default class PullToRefresh extends Component<*> {
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl {...this.props} />
        }
      >
        {this.props.children}
      </ScrollView>
    );
  }
}
