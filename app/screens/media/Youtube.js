// @flow

import React, { Component } from 'react';
import { Container, Item, Icon, Input, List, ListItem, Text } from 'native-base';
import { connect } from 'react-redux';
import { fetchSongs } from '/store/actions/media/youtube';
import type { Song, SearchTerm } from '/types/media/youtube'; 
import type { State, Dispatch } from '/types';

type Props = {
  songs: Song[],
  isLoading: boolean,
  fetchSongs: ( searchTerm: SearchTerm ) => void,
}

class Youtube extends Component<Props> {

  onChange( searchTerm ) {
    console.log( searchTerm );
    this.props.fetchSongs( searchTerm );
  }

  render() {
    return (
      <Container>
        <Item>
          <Icon name='search' />
          <Input placeholder='Search'
            onChangeText={( e ) => this.onChange( e )}
          />
          <Icon name='musical-note' />
        </Item>
        <List dataArray={this.props.songs}
          renderRow={( song ) =>
            <ListItem>
              <Text>
                {song}
              </Text>
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
