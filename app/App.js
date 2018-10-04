/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Navigator from './navigation/Navigator.js';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Navigator />
    );
  }
}
