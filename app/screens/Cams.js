// @flow

import React, { Component } from 'react';
import { StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { NoFlickerImage } from 'react-native-no-flicker-image';
import { Container, Content, List, ListItem } from 'native-base';
import type { NavigationScreenProp } from 'react-navigation';
import CamModal from '/components/cams/CamModal';
import { CAMS_URL } from '/config';

type Props = {
  navigation: NavigationScreenProp,
}

type State = {
  cams: string[],
  wrongCre: boolean,
  modalVisible: boolean,
  credentials: string
}

export default class Cams extends Component<Props, State> {
  interval: ?IntervalID;
  state = {
    cams: [],
    wrongCre: false,
    modalVisible: false,
    credentials: '',
  }

  componentDidMount() {
    AsyncStorage.getItem( 'credentials' )
      .then( credentials => {
        console.log( credentials );
        if ( !credentials ) {
          this.openModal();
        } else {
          this.setState( { credentials: credentials } );
          this.startCams();
        }
      } );
  }

  startCams() {
    this.startPoll();
    this.props.navigation.addListener( 'didFocus', this.startPoll.bind( this ) );
    this.props.navigation.addListener( 'willBlur', this.stopPoll.bind( this ) );
  }

  startPoll() {
    if ( !this.interval ) {
      this.interval = setInterval( this.getCams.bind( this ), 2000 );
      this.getCams();
    }
  }

  stopPoll() {
    if ( this.interval ) {
      clearInterval( this.interval );
      this.interval = null;
    }
  }

  openModal( wrongCre: boolean = false ) {
    this.setState( { modalVisible: true, wrongCre } );
  }

  closeModal() {
    this.setState( { modalVisible: false } );
  }

  onCredentials( credentials: string ) {
    this.setState( { credentials: credentials } );
    this.closeModal();
    this.startCams();
  }


  getCams() {
    let cams = [];
    for ( let i = 0; i < 4; i++ ) {
      cams.push( CAMS_URL + i + '?rand=' + Math.random() );
    }
    this.setState( { cams } );
  }

  render() {
    return (
      <Container>
        <Content>
          <List dataArray={this.state.cams}
            renderRow={( cam ) =>
              <ListItem>
                <NoFlickerImage 
                  style={styles.image} 
                  fadeDuration={0} 
                  onError={() => this.openModal( true )}
                  source={{ 
                    uri: cam,
                    headers: {
                      Authorization: 'Basic ' + this.state.credentials,
                    },
                  }}
                />
              </ListItem>
            } />
          <CamModal
            visible={this.state.modalVisible}
            wrongCre={this.state.wrongCre}
            onCancel={this.closeModal.bind( this )}
            onCredentials={this.onCredentials.bind( this )}
          />
        </Content>
      </Container>
    );
  }
}

let width = Dimensions.get( 'window' ).width;

const styles = StyleSheet.create( {
  image: {
    width: width - 35,
    height: 400,
  },
} );
