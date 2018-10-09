// @flow

import React, { Component } from 'react';
import { Text, Container, List, ListItem, Content, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { soundboardSetSounds } from '../../store/actions/media/soundboard.js';
const url = 'http://m.isw/api/sb/';

type Props = {
  sounds: [],
  isLoading: boolean,
  folders: [String],
  setSounds: () => void,
}

class Soundboard extends Component<Props> {

  componentDidMount() {
    fetch( url )
      .then( response => response.json() )
      .then( sounds => 
        this.props.setSounds( sounds, this.detectFolders( sounds ) )
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

  render() {
    if ( !this.props.isLoading && this.props.folders ) {
      return (
        <Container>
          <Content>
            <List dataArray={this.props.folders}
              renderRow={( folder ) => 
                <ListItem>
                  <Text>{folder}</Text>
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
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    setSounds( sounds, folders ) {
      dispatch( soundboardSetSounds( sounds, folders ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Soundboard );


