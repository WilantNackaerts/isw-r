// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RadioRegion from '/components/media/radio/RadioRegion';
import PullToRefresh from '/components/PullToRefresh.js';
import { fetchAllStations, fetchFailedStations, reloadAllStations } from '/store/actions/media/radio.js';
import type { TabNavigation } from '/components/MediaTabs';
import type { Region } from '/types/media/radio/index';
import type { State, Dispatch } from '/types';

type Props = {
  regions: Region[],
  reloading: boolean,
  failed: boolean,
  fetchAllStations: () => void,
  fetchFailedStations: () => void,
  reloadAllStations: () => void,
  navigation: TabNavigation,
}

class Radio extends Component<Props> {
  componentWillMount() {
    this.props.fetchAllStations();
    this.props.navigation.onFocus( this.onFocus.bind( this ) );
  }
  
  onFocus() {
    if ( this.props.failed ) {
      this.props.fetchFailedStations();
    }
  }
  
  reload() {
    this.props.reloadAllStations();
  }
 
  render() {
    return (
      <PullToRefresh refreshing={this.props.reloading} onRefresh={this.reload.bind( this )}>
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
    failed: state.media.radio.some( region => region.failed ),
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchAllStations() {
      dispatch( fetchAllStations() );
    },
    fetchFailedStations() {
      dispatch( fetchFailedStations() );
    },
    reloadAllStations() {
      dispatch( reloadAllStations() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Radio );
