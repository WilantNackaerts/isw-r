// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { List } from 'native-base';
import Sound from '/components/media/soundboard/Sound';
import Folder from '/components/media/soundboard/Folder';
import type { State } from '/types';
import type { Item as SoundboardItem } from '/types/media/soundboard';
import type { NavigationScreenProp } from 'react-navigation';

type NavigationState = {
  params: {
    prefix: string,
  },
};

type Props = {
  items: SoundboardItem[],
  searchterm: string,
  navigation: NavigationScreenProp<NavigationState>,
}

function filter( items: SoundboardItem[], prefix: string, searchterm: string ): SoundboardItem[] {
  items = items
    .filter( item => item.basename === prefix );
  
  if ( searchterm ) {
    searchterm = searchterm.toLowerCase();
    items = items.filter( item => item.name.toLowerCase().includes( searchterm ) );
  }

  return items;
}

class Soundboard extends Component<Props> {
  render() {
    const prefix = this.props.navigation.getParam( 'prefix', '/' );
    const items = filter( this.props.items, prefix, this.props.searchterm );

    return (
      <List dataArray={items} style={styles.list}
        renderRow={( item ) => 
          item.isFolder ? <Folder folder={item} /> : <Sound sound={item} />
        } />
    );
  }
}

const styles = StyleSheet.create( {
  list: {
    backgroundColor: 'white',
  },
} );

function mapStateToProps( state: State ) {
  return {
    items: state.media.soundboard.items,
    searchterm: state.media.soundboard.searchterm,
  };
}

export default connect( mapStateToProps )( Soundboard );


