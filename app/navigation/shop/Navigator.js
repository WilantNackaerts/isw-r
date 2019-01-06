// @flow

import React, { Component, type Node, type Element } from 'react';
import { StyleSheet, Easing, Animated } from 'react-native';
import { createStackNavigator, type HeaderProps } from 'react-navigation';
import { Header, Title, Body, Left, Right } from 'native-base';
import routes, { USERS } from './routes';
import styles from '/styles';

function maybeRender( Container: Class<Component<any>>, elem: Node, props: HeaderProps ): ?Element<any> {
  if ( typeof elem === 'function' ) {
    elem = elem( props );
  }
  
  if ( elem ) {
    return ( <Container>{elem}</Container> );
  }

  return null;
}

export default createStackNavigator( routes, {
  initialRouteName: USERS,
  navigationOptions: {
    header: props => {
      const opts = props.scene.descriptor.options;
      return (
        <Header noLeft={!opts.headerLeft} noRight={!opts.headerRight}>
          { maybeRender( Left, opts.headerLeft, props ) }
          <Body style={stylesheet.title}>
            <Title>{opts.headerTitle}</Title>
          </Body>
          { maybeRender( Right, opts.headerRight, props ) }
        </Header>
      );
    },
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

const stylesheet = StyleSheet.create( {
  title: {
    flex: 3,
  },
} );
