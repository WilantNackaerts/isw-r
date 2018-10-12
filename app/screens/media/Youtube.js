// @flow

import React, { Component } from 'react';
import { Text, Container, Item, Icon, Input } from 'native-base';
import { connect } from 'react-redux';
import { youtubeSetSong } from '../../store/actions/media/youtube.js';

// TODO: put in .env
// const url = 'http://m.isw/api/';
// const key = 'xxx';

type Props = {
  song: '',
}

class Youtube extends Component<Props> {
  render() {
    return (
      <Container>
        <Item>
          <Icon name='search' />
          <Input placeholder='Search' 
            onChangeText={( song ) => this.setState( { song } )}
            autoFocus
          />
          <Icon name='musical-note' />
        </Item>
        <Text>Youtube</Text>
      </Container>
    );
  }
}

function mapStateToProps( state ) {
  return {
    song: state.youtube.song,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    setSong( song ) {
      dispatch( youtubeSetSong( song ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Youtube );
