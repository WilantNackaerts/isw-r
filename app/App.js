/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigator from '/navigation/main/Navigator';
import store from '/store';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen';

type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <Root>
          <Navigator />
        </Root>
      </Provider>
    );
  }
}
