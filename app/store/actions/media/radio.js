// @flow

import * as actions from '../../actionTypes/media/radio.js';
import { MEDIA_API_URL } from '../../../config.js';
import type { Dispatch } from 'redux';

type RadioSetVrtAction = {
  type: typeof actions.SET_VRT,
  vrtItems: [string],
}

type RadioSetBeAction = {
  type: typeof actions.SET_BE,
  beItems: [string],
}

function _fetchVrtStation( dispatch: Dispatch ) {
  dispatch( startFetchVrtStations() );

  fetch( MEDIA_API_URL + '/vrt/list' )
    .then( response => response.json() )
    .then( vrtItems => dispatch( setVrtStations( vrtItems.stations ) ) );
}

function _fetchBeStations( dispatch: Dispatch ) {
  dispatch( startFetchBeStations() );
  
  fetch( MEDIA_API_URL + '/be/list' )
    .then( response => response.json() )
    .then( beItems => dispatch( setBeStations( beItems.stations ) ) );
}

export function fetchVrtStations() {
  return _fetchVrtStation;
}

export function fetchBeStations() {
  return _fetchBeStations;
}

export function startFetchVrtStations() {
  return {
    type: actions.FETCH_VRT,
  };
}

export function startFetchBeStations() {
  return {
    type: actions.FETCH_BE,
  };
}

export function setVrtStations( vrtItems: [string] ): RadioSetVrtAction {
  return {
    type: actions.SET_VRT,
    vrtItems,
  };
}

export function setBeStations( beItems: [string] ): RadioSetBeAction {
  return {
    type: actions.SET_BE,
    beItems,
  };
}
