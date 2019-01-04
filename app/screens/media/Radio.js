// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RadioRegion from '/components/media/radio/RadioRegion';
import PullToRefresh from '/components/PullToRefresh.js';
import { fetchAllStations, fetchFailedStations, reloadAllStations } from '/store/actions/media/radio.js';
import type { TabNavigator } from '/components/MediaTabs';
import type { Region } from '/types/media/radio/index';
import type { State, Dispatch } from '/types';

type AutoPassedProps = {|
  navigation: TabNavigator,
|};

type StoreProps = {|
  regions: Region[],
  reloading: boolean,
  failed: boolean,
|};

type DispatchProps = {|
  fetchAllStations: () => void,
  fetchFailedStations: () => void,
  reloadAllStations: () => void,
|};

type Props = {
  ...AutoPassedProps,
  ...StoreProps,
  ...DispatchProps,
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

function mapStateToProps( state: State ): StoreProps {
  return {
    regions: state.media.radio,
    reloading: state.media.radio.some( region => region.reloading ),
    failed: state.media.radio.some( region => region.failed ),
  };
}

function mapDispatchToProps( dispatch: Dispatch ): DispatchProps {
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
