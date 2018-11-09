// @flow

import React, { Component } from 'react';
import ListWithSearch from './ListWithSearch';
const rvalidate = /[^a-z0-9]/ig;

type Props<T> = $Shape<$PropertyType<ListWithSearch<T>, 'props'>> & {
  filterProp: string | number,
};

type State = {
  term: string,
}

export default class FilterList<T> extends Component<Props<T>, State> {
  constructor() {
    super();
    this.state = { term: '' };
  }
  
  onChange( term: string ) {
    this.setState( {
      term: term.replace( rvalidate, '' ),
    } );
  }

  getItems(): ?$ReadOnlyArray<T> {
    let items = this.props.data;

    if ( !items ) {
      return null;
    }

    if ( this.state.term ) {
      const rsearch = new RegExp( this.state.term.split( '' ).join( '.*' ) );
      items = items.filter( item => {
        // $FlowFixMe https://stackoverflow.com/questions/53230604/flowtype-generic-type-with-type-annotation-for-dynamic-key
        return rsearch.test( item[ this.props.filterProp ] );
      } );
    }

    return items;
  }

  render() {
    const items = this.getItems();

    return (
      <ListWithSearch
        {...this.props}
        data={items}
        onChange={this.onChange.bind( this )}
      />
    );
  }
}
