// @flow
import React, { Component } from 'react';
import { StyleSheet, Slider } from 'react-native';
import { Icon, Footer, View, Text } from 'native-base';
import ClickableIcon from '/components/ClickableIcon';
import type { Song } from '/types/media/player';
import type { State, Dispatch, GetState } from '/types';
import { connect } from 'react-redux';
import { fetchPlayer, play, pause, volume, toggleMuted, next, previous } from '/store/actions/media/player';
import { withNavigation, type NavigationScreenProp } from 'react-navigation';

type Props = {
  hasSongs: boolean,
  currentSong: Song,
  muted: boolean,
  paused: boolean,
  volume: number,
  canGoForward: boolean,
  canGoBackward: boolean,
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
    return (
      <Footer style={styles.row}>
        <View style={styles.titleAndVolume}>
          <Text style={styles.enabled} numberOfLines={1}>{this.props.currentSong.title}</Text>
          <View style={styles.volume}>
            <Icon name='volume-off'
              style={[ styles.volumeIcon, this.props.muted ? styles.enabled : styles.disabled ]} 
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
        <ClickableIcon
          name='md-skip-backward'
          onPress={this.props.previous}
          enabled={this.props.canGoBackward}
          style={styles.skipButton} 
          enabledStyle={styles.enabled}
          disabledStyle={styles.disabled}
        />
        <ClickableIcon
          name={this.props.paused ? 'play' : 'pause'}
          onPress={this.playPause.bind( this )}
          enabled={this.props.hasSongs}
          style={styles.playButton}
          enabledStyle={styles.enabled}
          disabledStyle={styles.disabled}
        />
        <ClickableIcon
          name='md-skip-forward'
          onPress={this.props.next}
          enabled={this.props.canGoForward}
          style={styles.skipButton}
          enabledStyle={styles.enabled}
          disabledStyle={styles.disabled}
        />
      </Footer>
    );
  }
}

const styles = StyleSheet.create( {
  enabled: {
    color: 'white',
  },
  disabled: {
    color: '#B3C7F9',
  },
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
  volume: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeIcon: {
    fontSize: 23,
  },
  sliderWrapper: {
    flex: 1,
  },
  playButton: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 35,
  },
  skipButton: {
    fontSize: 22,
  },
} );

function mapStateToProps( state: State ) {
  return {
    hasSongs: state.media.player.queue && state.media.player.queue.length > 0,
    currentSong: state.media.player.currentSong,
    muted: state.media.player.muted,
    paused: state.media.player.paused,
    volume: state.media.player.volume,
    canGoForward: state.media.player.queuePosition < state.media.player.queue.length - 1,
    canGoBackward: state.media.player.queuePosition > 0,
  };
}

function mapDispatchToProps( dispatch: Dispatch, getState: GetState ) {
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
