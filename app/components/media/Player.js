// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Footer, View, Text } from 'native-base';
import type { Song } from '/types/media/player';
import type { State, Dispatch } from '/types';
import { connect } from 'react-redux';
import { fetchPlayer } from '/store/actions/media/player';
import { withNavigation, type NavigationScreenProp } from 'react-navigation';


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

  render() {
    return (
      <Footer>
        <View style={styles.row}>
          <Icon name='md-skip-backward' />
          <Icon name='md-play' />
          <Icon name='md-skip-forward' />
          <Text>{this.props.currentSong.title}</Text>
        </View>
      </Footer>
    );
  }
}

const styles = StyleSheet.create( {
  row: {
    flex: 1,
    flexDirection: 'row',
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
