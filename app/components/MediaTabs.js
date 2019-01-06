// @flow

import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { Tab, Tabs, TabHeading, Text, Container } from 'native-base';
import Youtube from '/screens/media/Youtube';
import Radio from '/screens/media/Radio';
import Soundboard from '/screens/media/Soundboard';

type Props = {}

export default class MediaTabs extends Component<Props> {
  navigator: MasterTabNavigator;
  
  constructor() {
    super();
    this.navigator = new MasterTabNavigator();
  }
  
  onChangeTab( opts: { from: number, i: number } ) {
    Keyboard.dismiss();
    this.navigator.onChangeTab( opts );
  }
  
  render() {
    return (
      <Container>
        <Tabs onChangeTab={this.onChangeTab.bind( this )}>
          <Tab heading={<TabHeading><Text>YouTube</Text></TabHeading>}>
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

class MasterTabNavigator {
  navigators: TabNavigator[];
  
  constructor() {
    this.navigators = [];
  }
  
  for( index: number ) {
    if ( !this.navigators[ index ] ) {
      this.navigators[ index ] = new TabNavigator( this );
    }
    
    return this.navigators[ index ];
  }
  
  onChangeTab( { from, i } ) {
    this.navigators[ from ].blur();
    this.navigators[ i ].focus();
  }
}

export class TabNavigator {
  master: MasterTabNavigator;
  _onFocus: ( () => void )[];
  _onBlur: ( () => void )[];
  
  constructor( master: MasterTabNavigator ) {
    this.master = master;
    this._onFocus = [];
    this._onBlur = [];
  }
  
  onFocus( cb: () => void ) {
    this._onFocus.push( cb );
  }
  
  onBlur( cb: () => void ) {
    this._onBlur.push( cb );
  }
  
  focus() {
    this._onFocus.forEach( cb => cb() );
  }
  
  blur() {
    this._onBlur.forEach( cb => cb() );
  }
}
