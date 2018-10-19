// @flow

import React, { Component } from 'react';
import { Footer, FooterTab } from 'native-base';
import Tab from './Tab';
import * as routes from '/navigation/routes';
import type { Navigation } from 'react-navigation';

type Props = {
  navigation: Navigation
};

export default class FooterTabs extends Component<Props> {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Tab
            icon='cart'
            label='Shop'
            routeName={routes.SHOP}
            navigation={this.props.navigation}
          />
          <Tab
            icon='musical-note'
            label='Media'
            routeName={routes.MEDIA}
            navigation={this.props.navigation}
          />
          <Tab
            icon='snow'
            label='Airco'
            routeName={routes.AIRCO}
            navigation={this.props.navigation}
          />
          <Tab
            icon='camera'
            label='Cams'
            routeName={routes.CAMS}
            navigation={this.props.navigation}
          />
        </FooterTab>
      </Footer>
    );
  }
}
