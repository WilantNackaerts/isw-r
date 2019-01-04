// @flow

import React, { Component } from 'react';
import { Container, ListItem, Text, Left, Thumbnail, Body } from 'native-base';
import { connect } from 'react-redux';
import ListWithSearch from '/components/ListWithSearch';
import { fetchSongs } from '/store/actions/media/youtube';
import { next } from '/store/actions/media/player';
import { catcher } from '/util/error.js';
import type { Song } from '/types/media/youtube'; 
import type { State, Dispatch } from '/types';
import { YOUTUBE_API_URL } from '/config';

type StoreProps = {|
  songs: Song[],
  paused: boolean,
|};

type DispatchProps = {|
  next: () => void,
  fetchSongs: ( searchTerm: string ) => void,
|};

type Props = {|
  ...StoreProps,
  ...DispatchProps,
|};

class Youtube extends Component<Props> {
  onChange( searchTerm ) {
    this.props.fetchSongs( searchTerm );
  }

  onPress( song ) {
    fetch( YOUTUBE_API_URL + '/' + song )
      .catch( catcher( 'Oops! Failed to play song from YouTube.' ) );
    if ( this.props.paused ) this.props.next();
  }

  render() {
    return (
      <Container>
        <ListWithSearch
          onChange={this.onChange.bind( this )}
          data={this.props.songs}
          keyExtractor={( song: Song ) => song.id}
          renderItem={( { item: song } ) =>
            <ListItem thumbnail button onPress={()=>this.onPress( song.id )} key={song.id}>
              <Left>
                <Thumbnail square source={{ uri: song.thumbnail.default.url }} />
              </Left>
              <Body>
                <Text>
                  {song.title}
                </Text>
              </Body>
            </ListItem>
          } />
      </Container>
    );
  }
}

function mapStateToProps( state: State ): StoreProps {
  return {
    songs: state.media.youtube.songs,
    paused: state.media.player.paused,
  };
}

function mapDispatchToProps( dispatch: Dispatch ): DispatchProps {
  return {
    fetchSongs( searchTerm ) {
      dispatch( fetchSongs( searchTerm ) );
    },
    next() {
      dispatch( next() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Youtube );
