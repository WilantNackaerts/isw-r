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
          icon='bowtie'
          label='Test 1'
          routeName={routes.TEST1}
          navigation={props.navigation}
        />
        <Tab
          icon='briefcase'
          label='Test 2'
          routeName={routes.TEST2}
          navigation={props.navigation}
        />
      </FooterTab>
    </Footer>
  );
};
