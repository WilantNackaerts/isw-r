// @flow

import React, { Component } from 'react';
import { Text, Container, Content, List, ListItem, Spinner,Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { fetchVrtStations, fetchBeStations } from '../../store/actions/media/radio.js';
import { MEDIA_URL, MEDIA_API_URL } from '../../config.js';

type Props = {
  vrtItems: [],
  beItems: [],
  isLoading: boolean,
  fetchVrtStations: () => void,
  fetchBeStations: () => void,
}

class Radio extends Component<Props> {

  componentDidMount() {
    this.props.fetchVrtStations();
    this.props.fetchBeStations();
  }

  onPress( station ) {
    fetch( MEDIA_API_URL + '/' + station.command + '/' + station.params );
  }

  render() {
    if ( !this.props.isLoading && this.props.vrtItems && this.props.beItems ) {
      return (
        <Container>
          <Content>
            <List dataArray={this.props.vrtItems}
              renderRow={( vrtItem ) => 
                <ListItem onPress={() => this.onPress( vrtItem )}>
                  <Thumbnail square source={{ uri: MEDIA_URL + vrtItem.logo }} />
                  <Text>{vrtItem.TITLE}</Text>
                </ListItem>
              } />
            <List dataArray={this.props.beItems}
              renderRow={( beItem ) =>
                <ListItem onPress={() => this.onPress( beItem )}>
                  <Thumbnail square source={{ uri: MEDIA_URL + beItem.logo }} />
                  <Text>{beItem.TITLE}</Text>
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
    vrtItems: state.radio.vrtItems,
    beItems: state.radio.beItems,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    fetchVrtStations() {
      dispatch( fetchVrtStations() );
    },
    fetchBeStations() {
      dispatch( fetchBeStations() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Radio );
