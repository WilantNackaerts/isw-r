// @flow
import React, { Component } from 'react';
import { StyleSheet, Slider } from 'react-native';
import { Icon, Footer, View, Text } from 'native-base';
import type { Song } from '/types/media/player';
import type { State, Dispatch } from '/types';
import { connect } from 'react-redux';
import { fetchPlayer, play, pause, volume, toggleMuted, next, previous } from '/store/actions/media/player';
import { withNavigation, type NavigationScreenProp } from 'react-navigation';

type Props = {
  currentSong: Song,
  muted: boolean,
  paused: boolean,
  volume: number,
  navigation: NavigationScreenProp,
  fetchPlayer: () => void,
  play: () => void,
  pause: () => void,
  setVolume: ( value: number ) => void,
  toggleMuted: () => void,
  next: () => void,
  previous: () => void,
};

class Player extends Component<Props> {
  interval: ?IntervalID;

  componentWillMount() {
    this.startPoll();
    this.props.navigation.addListener( 'didFocus', this.startPoll.bind( this ) );
    this.props.navigation.addListener( 'willBlur', this.stopPoll.bind( this ) );
  }

  startPoll() {
    if ( !this.interval ) {
      this.interval = setInterval( this.props.fetchPlayer, 1000 );
      this.props.fetchPlayer();
    }
  }

  stopPoll() {
    if ( this.interval ) {
      clearInterval( this.interval );
      this.interval = null;
    }
  }

  playPause() {
    this.props.paused ? this.props.play() : this.props.pause();
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
            <Icon name='volume-off'
              style={[ styles.volumeIcon, this.props.muted ? styles.volumeIconMuted : styles.volumeIconNotMuted ]} 
              onPress={this.props.toggleMuted}
            />
            <View style={styles.sliderWrapper}>
              <Slider
                minimumTrackTintColor='white'
                thumbTintColor='white'
                maximumValue={100}
                step={1}
                value={this.props.volume} 
                onValueChange={this.props.setVolume} />
            </View>
          </View>
        </View>
        <Icon name='md-skip-backward' style={styles.skipButton} 
          onPress={this.props.previous}
        />
        <Icon name={this.props.paused ? 'play' : 'pause'} style={styles.playButton} 
          onPress={this.playPause.bind( this )}
        />
        <Icon name='md-skip-forward' style={styles.skipButton} 
          onPress={this.props.next}
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
  titleAndVolume: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginRight: 30,
  },
  title: {
    color: 'white',
  },
  volume: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeIcon: {
    color: 'white',
    fontSize: 23,
  },
  volumeIconMuted: {
    color: 'white',
  },
  volumeIconNotMuted: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  sliderWrapper: {
    flex: 1,
  },
  playButton: {
    color: 'white',
    marginLeft: 15,
    marginRight: 15,
    fontSize: 35,
  },
  skipButton: {
    color: 'white',
    fontSize: 22,
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
    play() {
      dispatch( play() );
    },
    pause() {
      dispatch( pause() );
    },
    setVolume( value: number ) {
      dispatch( volume( value ) );
    },
    toggleMuted() {
      dispatch( toggleMuted() );
    },
    next() {
      dispatch( next() );
    },
    previous() {
      dispatch( previous() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( withNavigation( Player ) );
