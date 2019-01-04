// @flow

import React, { Component } from 'react';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import RadioRegion from '/components/media/radio/RadioRegion';
import type { Region } from '/types/media/radio/index';
import type { State } from '/types';

type Props = {
  regions: Region[],
}

class Radio extends Component<Props> {
  render() {
    return (
      <Content>
        {
          this.props.regions.map( region => (
            <RadioRegion
              regionName={region.apiName}
              key={region.apiName}
            />
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

export default connect( mapStateToProps )( Radio );
