// @flow

import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import type { NavigationScreenProp } from 'react-navigation';
import { CAMS_URL } from '/config';
import { CAMS_LOGIN } from '/secret';

type Props = {
  navigation: NavigationScreenProp,
}

type State = {
  cams: string[]
}

export default class Cams extends Component<Props, State> {
  interval: ?IntervalID;
  state = {
    cams: [],
  }

  componentDidMount() {
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


  getCams() {
    let cams = [];
    for ( let i = 0; i < 4; i++ ) {
      cams.push( CAMS_URL + i + '?rand=' + Math.random() );
      console.log( cams[ i ] );
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
                <Image style={styles.image} fadeDuration={0} source={{ 
                  uri: cam,
                  headers: {
                    Authorization: 'Basic ' + CAMS_LOGIN,
                  },
                }}
                />
              </ListItem>
            } />
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
