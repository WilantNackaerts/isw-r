// @flow

import React, { Component } from 'react';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import RadioRegion from '/components/media/radio/RadioRegion';
import { next } from '/store/actions/media/player';
import { fetchAllStations } from '/store/actions/media/radio';
import type { Region } from '/types/media/radio/index';
import type { State, Dispatch } from '/types';

type Props = {
  regions: Region[],
  paused: boolean,
  fetchStations: () => void,
  next: () => void,
}

class Radio extends Component<Props> {
  componentDidMount() {
    this.props.fetchStations();
  }

  render() {
    return (
      <Content>
        {
          this.props.regions.map( region => (
            <RadioRegion region={region} key={region.apiName} next={this.props.next.bind( this )} paused={this.props.paused} />
          ) )
        }
      </Content>
    );
  }
}

function mapStateToProps( state: State ) {
  return {
    regions: state.media.radio,
    paused: state.media.player.paused,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchStations() {
      dispatch( fetchAllStations() );
    },
    next() {
      dispatch( next() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Radio );
