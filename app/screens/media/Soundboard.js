// @flow

import React, { Component } from 'react';
import { Text, Container, List, ListItem, Content, Spinner, Right, Icon, Left } from 'native-base';
import { connect } from 'react-redux';
import { soundboardSetSounds } from '../../store/actions/media/soundboard.js';
const url = 'http://m.isw/api/sb/';

type Props = {
  sounds: [],
  soundsNF: [],
  folders: [],
  isLoading: boolean,
  setSounds: () => void,
}

class Soundboard extends Component<Props> {

  componentDidMount() {
    fetch( url )
      .then( response => response.json() )
      .then( sounds => 
        this.props.setSounds( sounds, this.detectFolders( sounds ), this.detectSoundsNF( sounds ) )
      );
  }

  detectFolders( sounds ) {
    const array = new Set();
    sounds.forEach( sound => {
      if ( String( sound.urlSnip ).indexOf( '/' ) !== -1 ) {
        array.add( String( sound.urlSnip ).split( '/' ) [ 0 ] );
      }
    } );
    return Array.from( array );
  }

  detectSoundsNF( sounds ) {
    const array = new Set();
    sounds.forEach( sound => {
      if ( String( sound.urlSnip ).indexOf( '/' ) === -1 ) {
        array.add( String( sound.urlSnip ) );
      }
    } );
    return Array.from( array );
  }

  onPress( sound ) {
    fetch( url + sound );
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

function mapStateToProps( state ) {
  return {
    isLoading: state.soundboard.isloading,
    sounds: state.soundboard.sounds,
    folders: state.soundboard.folders,
    soundsNF: state.soundboard.soundsNF,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    setSounds( sounds, folders, soundsNF ) {
      dispatch( soundboardSetSounds( sounds, folders, soundsNF ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Soundboard );


