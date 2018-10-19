// @flow

import React, { Component } from 'react';
import { Text, Container, List, ListItem, Content, Spinner, Right, Icon, Left } from 'native-base';
import { connect } from 'react-redux';
import { soundboardSetSounds } from '../../store/actions/media/soundboard.js';
import { SOUNDBOARD_URL } from '../../config.js';
import type { State, Dispatch } from '../../types';
import type { Sound, Folder, Item } from '../../types/media/soundboard';

type Props = {
  sounds: Item[],
  soundsNF: Sound[],
  folders: Folder[],
  isLoading: boolean,
  setSounds: ( sounds: Item[], folder: Folder[], soundsNF: Sound[] ) => void,
}

class Soundboard extends Component<Props> {

  componentDidMount() {
    fetch( SOUNDBOARD_URL )
      .then( response => response.json() )
      .then( sounds => 
        this.props.setSounds( sounds, this.detectFolders( sounds ), this.detectSoundsNF( sounds ) )
      );
  }

  detectFolders( sounds ): string[] {
    const array = new Set();
    sounds.forEach( sound => {
      if ( String( sound.urlSnip ).indexOf( '/' ) !== -1 ) {
        array.add( String( sound.urlSnip ).split( '/' ) [ 0 ] );
      }
    } );
    return Array.from( array );
  }

  detectSoundsNF( sounds ): string[] {
    const array = new Set();
    sounds.forEach( sound => {
      if ( String( sound.urlSnip ).indexOf( '/' ) === -1 ) {
        array.add( String( sound.urlSnip ) );
      }
    } );
    return Array.from( array );
  }

  onPress( sound ) {
    fetch( SOUNDBOARD_URL + '/' + sound );
  }

  render() {
    if ( !this.props.isLoading && this.props.folders ) {
      return (
        <Container>
          <Content>
            <List dataArray={this.props.folders}
              renderRow={( folder ) => 
                <ListItem>
                  <Left>
                    <Text>{folder}</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem> 
              } />
            <List dataArray={this.props.soundsNF}
              renderRow={( sound ) =>
                <ListItem onPress={() => this.onPress( sound )}>
                  <Text>{sound}</Text>
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
    sounds: state.media.soundboard.sounds,
    folders: state.media.soundboard.folders,
    soundsNF: state.media.soundboard.soundsNF,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    setSounds( sounds: Item[], folders: Folder[], soundsNF: Sound[] ) {
      dispatch( soundboardSetSounds( sounds, folders, soundsNF ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Soundboard );


