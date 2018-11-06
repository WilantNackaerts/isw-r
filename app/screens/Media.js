// @flow

import React, { Component } from 'react';
import { Container } from 'native-base';
import MediaTabs from '/components/MediaTabs';
import Player from '/components/media/Player';

export default class Media extends Component<{}> {
  render() {
    return (
      <Container>
        <MediaTabs />
        <Player />
      </Container>
    );
  }
}
