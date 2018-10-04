// @flow

import { createBottomTabNavigator } from 'react-navigation';
import routes from './routes.js';
import FooterTabs from '../components/FooterTabs.js';

export default createBottomTabNavigator( routes, {
  tabBarComponent: FooterTabs,
} );
