// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'native-base';

export default class Fan extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button transparent>
            <Text>Auto</Text>
          </Button>
        </View>
        <View>
          <Button transparent>
            <Icon name='fan' type='MaterialCommunityIcons' />
          </Button>
        </View>
        <View>
          <Button transparent>
            <Icon name='fan' type='MaterialCommunityIcons' style={styles.icon_lg} />
          </Button>
        </View>
        <View>
          <Button transparent>
            <Icon name='fan' type='MaterialCommunityIcons' style={styles.icon_xlg} />
          </Button>
        </View>
        <View>
          <Button transparent>
            <Icon name='jet' style={styles.icon_xlg} />
          </Button>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create( {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_lg: {
    fontSize: 33,
  },
  icon_xlg: {
    fontSize: 39,
  },
} );
