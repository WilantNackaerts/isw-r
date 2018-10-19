// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Container, List, ListItem, Content, Spinner, Right, Icon, Left } from 'native-base';
import { SOUNDBOARD_URL } from '/config';
import { fetchSounds } from '/store/actions/media/soundboard';
import type { State, Dispatch } from '/types';
import type { Item } from '/types/media/soundboard';

type Props = {
  items: Item[],
  isLoading: boolean,
  prefix: string,
  fetchSounds: () => void,
}

function filter( items: Item[], prefix: string ) {
  return items
    .filter( item => item.path.startsWith( prefix ) )
    .filter( item => !item.path.slice( prefix.length ).includes( '/' ) );
}

class Soundboard extends Component<Props> {
  componentDidMount() {
    this.props.fetchSounds();
  }

  onPress( sound ) {
    fetch( SOUNDBOARD_URL + '/' + sound );
  }

  render() {
    if ( !this.props.isLoading && this.props.items ) {
      const items = filter( this.props.items, this.props.prefix );

      return (
        <Container>
          <Content>
            <List dataArray={items}
              renderRow={( item ) => 
                <ListItem>
                  <Left>
                    <Text>{item.name}</Text>
                  </Left>
                  { item.isFolder ? ( <Right><Icon name="arrow-forward" /></Right> ) : null }
                </ListItem> 
              } />
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Content>
            <Spinner color='blue' />
          </Content>
        </Container>
      );
    }
  }
}

function mapStateToProps( state: State ) {
  return {
    isLoading: state.media.soundboard.isLoading,
    items: state.media.soundboard.items,
    prefix: state.media.soundboard.prefix,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchSounds() {
      dispatch( fetchSounds() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Soundboard );


