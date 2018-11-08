// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';
import Search from '/components/Search';
import SoundboardNavigator from '/navigation/soundboard/Navigator';
import { fetchSounds, setSearch } from '/store/actions/media/soundboard';
import type { Item as SoundboardItem } from '/types/media/soundboard';
import type { State, Dispatch } from '/types';

type Props = {
  isLoading: boolean,
  items: SoundboardItem[],
  searchterm: string,
  fetchSounds: () => void,
  setSearch: ( term: string ) => void
};

class Soundboard extends Component<Props> {
  componentDidMount() {
    this.props.fetchSounds();
  }

  onChange( term ) {
    this.props.setSearch( term );
  }

  render() {
    if ( !this.props.isLoading && this.props.items ) {
      return (
        <Container>
          <Search term={this.props.searchterm} onChange={this.onChange.bind( this )} />
          <View style={styles.listWrapper}>
            <SoundboardNavigator />
          </View>
        </Container>
      );
    }
    else {
      return (
        <Container>
          <Content>
            <Spinner color="blue" />
          </Content>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create( {
  listWrapper: {
    flexGrow: 1,
  },
} );

function mapStateToProps( state: State ) {
  return {
    isLoading: state.media.soundboard.isLoading,
    items: state.media.soundboard.items,
    searchterm: state.media.soundboard.searchterm,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
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
