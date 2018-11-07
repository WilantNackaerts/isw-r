// @flow

import React, { Component } from 'react';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { clearSearch } from '/store/actions/media/soundboard';
import { SOUNDBOARD } from '/navigation/soundboard/routes';
import type { Item } from '/types/media/soundboard';
import type { NavigationScreenProp } from 'react-navigation';
import type { Dispatch } from '/types';

type Props = {
  folder: Item,
  navigation: NavigationScreenProp,
  clearSearch: () => void
}

class Folder extends Component<Props> {
  select() {
    this.props.clearSearch();
    this.props.navigation.push( SOUNDBOARD, {
      prefix: this.props.folder.path + '/',
    } );
  }

  render() {
    return (
      <ListItem onPress={this.select.bind( this )}>
        <Left>
          <Text>{this.props.folder.label}</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    clearSearch() {
      dispatch( clearSearch() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( withNavigation( Folder ) );
