// @flow

import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { Tab, Tabs, TabHeading, Text, Container } from 'native-base';
import Youtube from '/screens/media/Youtube';
import Radio from '/screens/media/Radio';
import Soundboard from '/screens/media/Soundboard';

type Props = {}

export default class MediaTabs extends Component<Props> {
  navigator: TabNavigator;
  
  constructor() {
    super();
    this.navigator = new TabNavigator();
  }
  
  onChangeTab( opts: { from: number, i: number } ) {
    Keyboard.dismiss();
    this.navigator.onChangeTab( opts );
  }
  
  render() {
    return (
      <Container>
        <Tabs onChangeTab={this.onChangeTab.bind( this )}>
          <Tab heading={<TabHeading><Text>Youtube</Text></TabHeading>}>
            <Youtube navigation={this.navigator.for( 0 )} />
          </Tab>
          <Tab heading={<TabHeading><Text>Radio</Text></TabHeading>}>
            <Radio navigation={this.navigator.for( 1 )} />
          </Tab>
          <Tab heading={<TabHeading><Text>Soundboard</Text></TabHeading>}>
            <Soundboard navigation={this.navigator.for( 2 )} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

class TabNavigator {
  _onFocus: ( () => void )[][];
  _onBlur: ( () => void )[][];
  
  constructor() {
    this._onFocus = [];
    this._onBlur = [];
  }
  
  for( index: number ) {
    if ( !this._onFocus[ index ] ) {
      this._onFocus[ index ] = [];
      this._onBlur[ index ] = [];
    }
    
    return new TabNavigation( this, index );
  }
  
  onChangeTab( { from, i } ) {
    this._onBlur[ from ].forEach( cb => cb() );
    this._onFocus[ i ].forEach( cb => cb() );
  }
}

export class TabNavigation {
  navigator: TabNavigator;
  index: number;
  
  constructor( navigator: TabNavigator, index: number ) {
    this.navigator = navigator;
    this.index = index;
  }
  
  onFocus( cb: () => void ) {
    this.navigator._onFocus[ this.index ].push( cb );
  }
  
  onBlur( cb: () => void ) {
    this.navigator._onBlur[ this.index ].push( cb );
  }
}
