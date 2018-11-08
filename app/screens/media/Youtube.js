// @flow

import React, { Component } from 'react';
import { Container, Item, Icon, Input, List, ListItem, Text, Left, Thumbnail, Body } from 'native-base';
import { connect } from 'react-redux';
import Search from '/components/Search';
import { fetchSongs } from '/store/actions/media/youtube';
import type { Song } from '/types/media/youtube'; 
import type { State, Dispatch } from '/types';
import { YOUTUBE_API_URL } from '/config';

type Props = {
  songs: Song[],
  fetchSongs: ( searchTerm: string ) => void,
}

class Youtube extends Component<Props> {

  onChange( searchTerm ) {
    this.props.fetchSongs( searchTerm );
  }

  onPress( song ) {
    fetch( YOUTUBE_API_URL + '/' + song );
  }

  render() {
    return (
      <Container>
        <Search onChange={this.onChange.bind( this )} />
        <List dataArray={this.props.songs}
          renderRow={( song ) =>
            <ListItem thumbnail button onPress={()=>this.onPress( song.id.videoId )}>
              <Left>
                <Thumbnail square source={{ uri: song.snippet.thumbnails.default.url }} />
              </Left>
              <Body>
                <Text>
                  {song.snippet.title}
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
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchSongs( searchTerm ) {
      dispatch( fetchSongs( searchTerm ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Youtube );
