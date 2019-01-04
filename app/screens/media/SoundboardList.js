// @flow

import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Sound from '/components/media/soundboard/Sound';
import Folder from '/components/media/soundboard/Folder';
import { reloadSounds } from '/store/actions/media/soundboard.js';
import type { State, Dispatch } from '/types';
import type { Item as SoundboardItem } from '/types/media/soundboard';
import type { NavigationScreenProp } from 'react-navigation';

type AutoPassedProps = {|
  navigation: NavigationScreenProp<NavigationState>,
|};

type StoreProps = {|
  items: SoundboardItem[],
  searchterm: string,
  reloading: boolean,
|};

type DispatchProps = {|
  reloadSounds: () => void,
|};

type Props = {|
  ...AutoPassedProps,
  ...StoreProps,
  ...DispatchProps,
|};

type NavigationState = {
  params: {
    prefix: string,
  },
};

class Soundboard extends Component<Props> {
  getItems(): SoundboardItem[] {
    const prefix = this.props.navigation.getParam( 'prefix', '/' );
    let items = this.props.items
      .filter( item => item.basename === prefix );

    if ( this.props.searchterm ) {
      const searchterm = this.props.searchterm;
      const rsearch = new RegExp( searchterm.split( '' ).join( '.*' ), 'i' );
      items = items.filter( item => rsearch.test( item.name ) );
    }

    return items;
  }

  render() {
    const items = this.getItems();

    return (
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={item => item.path}
        renderItem={( { item } ) => 
          item.isFolder ? <Folder folder={item} /> : <Sound sound={item} />
        }
        onRefresh={this.props.reloadSounds}
        refreshing={this.props.reloading}
      />
    );
  }
}

const styles = StyleSheet.create( {
  list: {
    backgroundColor: 'white',
  },
} );

function mapStateToProps( state: State ): StoreProps {
  return {
    items: state.media.soundboard.items,
    searchterm: state.media.soundboard.searchterm,
    reloading: state.media.soundboard.reloading,
  };
}

function mapDispatchToProps( dispatch: Dispatch ): DispatchProps {
  return {
    reloadSounds() {
      dispatch( reloadSounds() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Soundboard );


