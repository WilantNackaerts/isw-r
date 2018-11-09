// @flow

import React from 'react';
import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Header, Title, Body } from 'native-base';
import routes, { USERS } from './routes';

export default createStackNavigator( routes, {
  initialRouteName: USERS,
  navigationOptions: {
    header: props => (
      <Header noLeft>
        <Body>
          <Title>{props.scene.descriptor.options.headerTitle}</Title>
        </Body>
      </Header>
    ),
  },
  transitionConfig: () => {
    return {
      transitionSpec: {
        duration: 200,
        easing: Easing.out( Easing.poly( 4 ) ),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const thisSceneIndex = scene.index;
        const width = layout.initWidth;

        const translateX = position.interpolate( {
          inputRange: [ thisSceneIndex - 1, thisSceneIndex ],
          outputRange: [ width, 0 ],
        } );

        return { transform: [ { translateX } ] };
      },
    };
  },
} );
