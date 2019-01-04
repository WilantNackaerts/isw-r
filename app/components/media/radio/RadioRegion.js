// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { View, ListItem, Text, Separator, Thumbnail } from 'native-base';
import Loading from '/components/Loading.js';
import { fetchStationsForRegion } from '/store/actions/media/radio.js';
import { next } from '/store/actions/media/player.js';
import { MEDIA_URL, MEDIA_API_URL } from '/config.js';
import { catcher } from '/util/error.js';
import type { Station } from '/types/media/radio';
import type { State, Dispatch } from '/types/index.js';

type PassedProps = {
  regionName: string,
};

type Props = {
  ...PassedProps,
  name: string,
  stations: Station[],
  loading: boolean,
  failed: boolean,
  paused: boolean,
  next: () => void,
  fetchStations: () => void
};

class RadioRegion extends Component<Props> {
  componentDidMount() {
    this.props.fetchStations();
  }
  
  onPress( station: Station ) {
    fetch( `${MEDIA_API_URL}/${station.url}` )
      .catch( catcher( 'Oops! Failed to start radio station.' ) );
    if ( this.props.paused ) this.props.next();
  }

  render() {
    if ( this.props.loading || this.props.failed ) {
      return (
        <View>
          <Separator bordered>
            <Text>{this.props.name}</Text>
          </Separator>
          <View style={styles.loading}>
            <Loading
              small
              loading={this.props.loading}
              failed={this.props.failed}
              onRetry={this.props.fetchStations}
              failedMessage='Failed to load stations for this region'
            />
          </View>
        </View>
      );
    }
    
    return (
      <View>
        <Separator bordered>
          <Text>{this.props.name}</Text>
        </Separator>
        <FlatList
          keyExtractor={station => station.url}
          data={this.props.stations}
          renderItem={( { item: station } ) => (
            <ListItem onPress={() => this.onPress( station )}>
              <Thumbnail square source={{ uri: `${MEDIA_URL}/${station.logo}` }} />
              <Text>{station.name}</Text>
            </ListItem>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  loading: {
    marginTop: 20,
    marginBottom: 20,
  },
} );

function mapStateToProps( state: State, props: PassedProps ) {
  const region = state.media.radio.find( region => region.apiName === props.regionName );

  if ( !region ) {
    return {
      name: '',
      stations: [],
      loading: false,
      failed: true,
      paused: state.media.player.paused,
    };
  }
  
  return {
    name: region.name,
    stations: region.stations,
    loading: region.loading,
    failed: region.failed,
    paused: state.media.player.paused,
  };
}

function mapDispatchToProps( dispatch: Dispatch, props: PassedProps ) {
  return {
    next() {
      dispatch( next() );
    },
    fetchStations() {
      dispatch( fetchStationsForRegion( props.regionName ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( RadioRegion );
