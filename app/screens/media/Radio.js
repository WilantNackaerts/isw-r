// @flow

import React, { Component } from 'react';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { radioSetStations } from '../../store/actions/media/radio.js';

// toDo: set in .env
const url = 'https://m.isw/api/';

type Props ={
  vrtItems: [string],
  setStation: ( string[] ) => void,
}

class Radio extends Component<Props> {

  componentDidMount() {
    fetch( url + '/vrt/list' )
      .then( reponse => Response.jspm() )
      .then( vrtItems => this.props.setStation( vrtItems ) );
  }

  render() {
    return (
      <Text>Radio</Text>
    );
  }
}

function mapStateToProps( state ) {
  return {
    vrtItems: state.radio.vrtItems,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    setStation( vrtItems ) {
      dispatch( radioSetStations( vrtItems ) );
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Radio );
