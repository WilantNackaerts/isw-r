// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import Search from '/components/Search';
import SoundboardNavigator from '/navigation/soundboard/Navigator';
import Loading from '/components/Loading.js';
import { fetchSounds, setSearch } from '/store/actions/media/soundboard';
import type { Item as SoundboardItem } from '/types/media/soundboard';
import type { State, Dispatch } from '/types';
import type { TabNavigator } from '/components/MediaTabs.js';

type AutoPassedProps = {|
  navigation: TabNavigator,
|};

type StoreProps = {|
  loading: boolean,
  failed: boolean,
  items: SoundboardItem[],
  searchterm: string,
|};

type DispatchProps = {|
  fetchSounds: () => void,
  setSearch: ( term: string ) => void
|};

type Props = {|
  ...AutoPassedProps,
  ...StoreProps,
  ...DispatchProps,
|};

class Soundboard extends Component<Props> {
  componentWillMount() {
    this.props.fetchSounds();
    this.props.navigation.onFocus( this.onFocus.bind( this ) );
  }
  
  onFocus() {
    if ( this.props.failed ) {
      this.props.fetchSounds();
    }
  }

  onChange( term ) {
    this.props.setSearch( term );
  }

  render() {
    if ( this.props.loading || this.props.failed ) {
      return (
        <Loading
          loading={this.props.loading}
          failed={this.props.failed}
          onRetry={this.props.fetchSounds}
          failedMessage='Failed to fetch sound effects.'
        />
      );
    }
    
    return (
      <Container>
        <Search term={this.props.searchterm} onChange={this.onChange.bind( this )} />
        <View style={styles.listWrapper}>
          <SoundboardNavigator />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create( {
  listWrapper: {
    flexGrow: 1,
    backgroundColor: 'red',
  },
} );

function mapStateToProps( state: State ): StoreProps {
  return {
    loading: state.media.soundboard.loading,
    failed: state.media.soundboard.failed,
    items: state.media.soundboard.items,
    searchterm: state.media.soundboard.searchterm,
  };
}

function mapDispatchToProps( dispatch: Dispatch ): DispatchProps {
  return {
    fetchSounds() {
      dispatch( fetchSounds() );
    },
    setSearch( term: string ) {
      dispatch( setSearch( term ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Soundboard );
