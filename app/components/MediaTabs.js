// @flow

import React, { Component } from 'react';
import { Tab, Tabs, TabHeading, Text, Container } from 'native-base';
import Youtube from '/screens/media/Youtube';
import Radio from '/screens/media/Radio';
import Soundboard from '/screens/media/Soundboard';

type Props = {}

export default class MediaTabs extends Component<Props> {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading={<TabHeading><Text>Youtube</Text></TabHeading>}>
            <Youtube />
          </Tab>
          <Tab heading={<TabHeading><Text>Radio</Text></TabHeading>}>
            <Radio />
          </Tab>
          <Tab heading={<TabHeading><Text>Soundboard</Text></TabHeading>}>
            <Soundboard />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
