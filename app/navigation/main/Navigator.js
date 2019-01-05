// @flow

import { createBottomTabNavigator } from 'react-navigation';
import routes, { AIRCO } from './routes';
import FooterTabs from '/components/FooterTabs';

export default createBottomTabNavigator( routes, {
  tabBarComponent: FooterTabs,
  initialRouteName: AIRCO,
} );
