// @flow

import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { TEST1, TEST2 } from './routes.js';
import type { Navigation } from 'react-navigation';

type Props = {
  navigation: Navigation
};

export default ( props: Props ) => {
  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={props.navigation.state.index === 0}
          onPress={() => props.navigation.navigate( TEST1 )}>
          <Icon name='bowtie' />
          <Text>Test 1</Text>
        </Button>
        <Button
          vertical
          active={props.navigation.state.index === 1}
          onPress={() => props.navigation.navigate( TEST2 )}>
          <Icon name='briefcase' />
          <Text>Test 2</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};
