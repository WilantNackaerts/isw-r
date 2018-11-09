// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Separator, Item, Icon, Input } from 'native-base';

type Props = {
  term?: string,
  onChange: ( term: string ) => void,
};

export default class Search extends Component<Props> {
  hasContent: boolean;
  _input: ?Input;

  onChange( term: string ) {
    this.hasContent = !!term;
    this.props.onChange( term );
  }

  clear() {
    if ( this._input && this._input.wrappedInstance ) {
      this._input.wrappedInstance.blur();
      // $FlowFixMe This complains about this._input possibly being null or undefined
      this._input.wrappedInstance.clear();
      this.onChange( '' );
    }
  }

  render() {
    return (
      <Separator bordered style={styles.wrapper}>
        <Item>
          <Icon name='search' />
          <Input
            placeholder='Search'
            value={this.props.term}
            onChangeText={this.onChange.bind( this )}
            ref={component => this._input = component}
          />
          {
            this.hasContent ?
              <Icon name='backspace' onPress={this.clear.bind( this )} /> :
              null
          }
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
