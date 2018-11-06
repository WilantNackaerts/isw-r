// @flow

import { createBottomTabNavigator } from 'react-navigation';
import routes from './routes';
import FooterTabs from '/components/FooterTabs';

export default createBottomTabNavigator( routes, {
  tabBarComponent: FooterTabs,
} );
