// @flow

import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View, ListItem, Text, Spinner, Separator, Thumbnail } from 'native-base';
import { MEDIA_URL, MEDIA_API_URL } from '/config';
import type { Region, Station } from '/types/media/radio';

type Props = {
  region: Region,
};

export default class RadioRegion extends Component<Props> {
  onPress( station: Station ) {
    fetch( `${MEDIA_API_URL}/${station.url}` )
      .catch( console.error );
  }

  render() {
    if ( this.props.region.loading ) {
      return (
        <View>
          <Separator bordered>
            <Text>{this.props.region.name}</Text>
          </Separator>
          <View style={styles.spinner}>
            <Spinner color='blue' />
          </View>
        </View>
      );
    }
    else {
      return (
        <View>
          <Separator bordered>
            <Text>{this.props.region.name}</Text>
          </Separator>
          <FlatList
            keyExtractor={station => station.url}
            data={this.props.region.stations}
            renderItem={( { item: station } ) => (
              <ListItem onPress={() => this.onPress( station )}>
                <Thumbnail square source={{ uri: `${MEDIA_URL}/${station.logo}` }} />
                <Text>{station.name}</Text>
              </ListItem>
            )}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create( {
  spinner: {
    textAlign: 'center',
  },
} );
