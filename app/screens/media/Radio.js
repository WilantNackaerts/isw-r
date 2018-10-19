// @flow

import React, { Component } from 'react';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import RadioRegion from '../../components/media/radio/RadioRegion';
import { fetchAllStations } from '../../store/actions/media/radio';
import type { Region } from '../../types/media/radio/index';
import type { State, Dispatch } from '../../types';

type Props = {
  regions: Region[],
  fetchStations: () => void,
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
            <RadioRegion region={region} key={region.apiName} />
          ) )
        }
      </Content>
    );
  }
}

function mapStateToProps( state: State ) {
  return {
    regions: state.media.radio,
  };
}

function mapDispatchToProps( dispatch: Dispatch ) {
  return {
    fetchStations() {
      dispatch( fetchAllStations() );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Radio );
