// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RadioRegion from '/components/media/radio/RadioRegion';
import PullToRefresh from '/components/PullToRefresh.js';
import { reloadAllStations } from '/store/actions/media/radio.js';
import type { Region } from '/types/media/radio/index';
import type { State, Dispatch } from '/types';

type Props = {
  regions: Region[],
  reloading: boolean,
  reloadAllStations: () => void,
}

class Radio extends Component<Props> {
  render() {
    return (
      <PullToRefresh refreshing={this.props.reloading} onRefresh={this.props.reloadAllStations}>
        {
          this.props.regions.map( region => (
            <RadioRegion
              regionName={region.apiName}
              key={region.apiName}
            />
          ) )
        }
      </PullToRefresh>
    );
  }
}

function mapStateToProps( state: State ) {
  return {
    regions: state.media.radio,
    reloading: state.media.radio.some( region => region.reloading ),
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    reloadAllStations() {
      dispatch( reloadAllStations() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Radio );
