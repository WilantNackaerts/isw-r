// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Footer, View, Text } from 'native-base';
import type { Song } from '/types/media/player';
import type { State, Dispatch } from '/types';
import { connect } from 'react-redux';
import { fetchPlayer } from '/store/actions/media/player';


type Props = {
  currentSong: Song,
  muted: false,
  paused: boolean,
  volume: number,
  fetchPlayer: () => void,
}

class Player extends Component<Props> {
  interval: IntervalID;

  componentDidMount() {
    this.interval = setInterval( () => this.props.fetchPlayer(), 1000 );
  }

  componentWillUnmount() {
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

export default connect( mapStateToProps, mapDispatchToProps )( Player );
