// @flow

import React, { Component } from 'react';
import { Container, ListItem, Text, Left, Thumbnail, Body } from 'native-base';
import { connect } from 'react-redux';
import ListWithSearch from '/components/ListWithSearch';
import { fetchSongs } from '/store/actions/media/youtube';
import { next } from '/store/actions/media/player';
import type { Song } from '/types/media/youtube'; 
import type { State, Dispatch } from '/types';
import { YOUTUBE_API_URL } from '/config';

type Props = {
  songs: Song[],
  paused: boolean,
  next: () => void,
  fetchSongs: ( searchTerm: string ) => void,
}

class Youtube extends Component<Props> {

  onChange( searchTerm ) {
    this.props.fetchSongs( searchTerm );
  }

  onPress( song ) {
    fetch( YOUTUBE_API_URL + '/' + song )
      .catch( console.error );
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

function mapStateToProps( state: State ) {
  return {
    songs: state.media.youtube.songs,
    paused: state.media.player.paused,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
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
