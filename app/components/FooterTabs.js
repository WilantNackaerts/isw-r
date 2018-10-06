// @flow

import React from 'react';
import { Footer, FooterTab } from 'native-base';
import Tab from './Tab.js';
import * as routes from '../navigation/routes.js';
import type { Navigation } from 'react-navigation';

type Props = {
  navigation: Navigation
};

export default ( props: Props ) => {
  return (
    <Footer>
      <FooterTab>
        <Tab
          icon='cart'
          label='Shop'
          routeName={routes.SHOP}
          navigation={props.navigation}
        />
        <Tab
          icon='musical-note'
          label='Media'
          routeName={routes.MEDIA}
          navigation={props.navigation}
        />
        <Tab
          icon='snow'
          label='Airco'
          routeName={routes.AIRCO}
          navigation={props.navigation}
        />
        <Tab
          icon='camera'
          label='Cams'
          routeName={routes.CAMS}
          navigation={props.navigation}
        />
      </FooterTab>
    </Footer>
  );
};
