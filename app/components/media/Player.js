// @flow
import React, { Component } from 'react';
import { StyleSheet, Slider } from 'react-native';
import { Icon, Footer, View, Text } from 'native-base';
import type { Song } from '/types/media/player';
import type { State, Dispatch } from '/types';
import { connect } from 'react-redux';
import { fetchPlayer } from '/store/actions/media/player';
import { withNavigation, type NavigationScreenProp } from 'react-navigation';
import { MEDIA_API_URL } from '/config';

type Props = {
  currentSong: Song,
  muted: false,
  paused: boolean,
  volume: number,
  navigation: NavigationScreenProp,
  fetchPlayer: () => void,
}

class Player extends Component<Props> {
  interval: IntervalID;

  componentDidMount() {
    this.props.navigation.addListener( 'didFocus', this.startPoll.bind( this ) );
    this.props.navigation.addListener( 'willBlur', this.stopPoll.bind( this ) );
  }

  startPoll() {
    this.interval = setInterval( this.props.fetchPlayer, 1000 );
  }

  stopPoll() {
    clearInterval( this.interval );
  }

  playPause() {
    const status = this.props.paused ? '/play' : '/pause';
    fetch( MEDIA_API_URL + status );
  }

  volume( value ) {
    fetch( MEDIA_API_URL + '/volume/' + value );
  }

  volumeOf() {
    const volume = this.props.volume !== 0 ? '0' : '50';
    fetch( MEDIA_API_URL + '/volume/' + volume ); 
  }

  playNext() {
    fetch( MEDIA_API_URL + '/next' );
  }

  render() {
    if ( !this.props.currentSong.title ) {
      return null;
    }

    return (
      <Footer style={styles.row}>
        <View style={styles.titleAndVolume}>
          <Text style={styles.title} numberOfLines={1}>{this.props.currentSong.title}</Text>
          <View style={styles.volume}>
            <Icon name={this.props.volume === 0 ? 'volume-up' : 'volume-off'} style={styles.volumeIcon} 
              onPress={this.volumeOf.bind( this )}
            />
            <View style={styles.sliderWrapper}>
              <Slider
                minimumTrackTintColor='white'
                thumbTintColor='white'
                maximumValue={100}
                step={1}
                value={this.props.volume} 
                onValueChange={( value ) => this.volume( value )} />
            </View>
          </View>
        </View>
        <Icon name={this.props.paused ? 'play' : 'pause'} style={styles.playButton} 
          onPress={this.playPause.bind( this )}
        />
        <Icon name='md-skip-forward' style={styles.nextButton} 
          onPress={this.playNext.bind( this )}
        />
      </Footer>
    );
  }
}

const styles = StyleSheet.create( {
  row: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: '#3848a2',
    borderBottomWidth: 2,
  },
  volumeIcon: {
    color: 'white',
    fontSize: 23,
  },
  titleAndVolume: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  title: {
    color: 'white',
  },
  volume: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderWrapper: {
    flex: 1,
  },
  playButton: {
    marginLeft: 40,
    color: 'white',
  },
  nextButton:{
    marginLeft: 20,
    color: 'white',
  },
} );

function mapStateToProps( state: State ) {
  return {
    currentSong: state.media.player.currentSong,
    muted: state.media.player.muted,
    paused: state.media.player.paused,
    volume: state.media.player.volume,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchPlayer() {
      dispatch( fetchPlayer() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( withNavigation( Player ) );
