// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Separator, Item, Icon, Input } from 'native-base';

type Props = {
  term?: string,
  onChange: ( term: string ) => void,
};

export default class Search extends Component<Props> {
  render() {
    return (
      <Separator bordered style={styles.wrapper}>
        <Item>
          <Icon name="search" />
          <Input placeholder="Search" value={this.props.term} onChangeText={this.props.onChange} />
        </Item>
      </Separator>
    );
  }
}

const styles = StyleSheet.create( {
  wrapper: {
    height: 'auto',
    flex: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
} );
