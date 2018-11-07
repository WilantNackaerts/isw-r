// @flow

import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import routes, { SOUNDBOARD } from './routes';

export default createStackNavigator( routes, {
  initialRouteName: SOUNDBOARD,
  initialRouteParams: {
    prefix: '/',
  },
  headerMode: 'none',
  transitionConfig: () => {
    return {
      transitionSpec: {
        duration: 300,
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
