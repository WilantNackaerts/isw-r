// @flow

import * as actions from '/types/media/radio/actions';
import { MEDIA_API_URL } from '/config';
import { catcher } from '/util/error.js';
import type { Thunk, Dispatch, GetState } from '/types';
import type {
  Station,
  StationsResponse,
  FetchStartAction,
  FetchEndAction,
  FetchFailAction,
  ReloadAction,
} from '/types/media/radio';

function _fetchStationsStart( region: string ): FetchStartAction {
  return {
    type: actions.FETCH_START,
    region,
  };
}

function _fetchStationsEnd( region: string, stations: Station[] ): FetchEndAction {
  return {
    type: actions.FETCH_END,
    region,
    stations,
  };
}

function _fetchStationsFail( region: string, soft?: boolean = false ): FetchFailAction {
  return {
    type: actions.FETCH_FAIL,
    region,
    soft,
  };
}

function _reloadStationsForRegion( region: string ): ReloadAction {
  return {
    type: actions.RELOAD,
    region,
  };
}

function _fetchStationsForRegion( region: string, dispatch: Dispatch ): Promise<StationsResponse> {
  return fetch( `${MEDIA_API_URL}/${region}/list` )
    .then( response => response.json() )
    .then( ( response: StationsResponse ) => {
      const stations = response.stations.map( station => ( {
        name: station.TITLE,
        url: `${station.command}/${station.params}`,
        logo: station.logo,
      } ) );

      dispatch( _fetchStationsEnd( region, stations ) );
    } );
}

export function fetchStationsForRegion( region: string ): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _fetchStationsStart( region ) );

    _fetchStationsForRegion( region, dispatch )
      .catch( () => dispatch( _fetchStationsFail( region ) ) );
  };
}

export function reloadStationsForRegion( region: string ): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _reloadStationsForRegion( region ) );

    _fetchStationsForRegion( region, dispatch )
      .catch( catcher( 'Oops! Failed to load stations in: ' + region, () => dispatch( _fetchStationsFail( region, true ) ) ) );
  };
}

export function fetchAllStations(): Thunk {
  return function( dispatch: Dispatch, getState: GetState ) {
    getState().media.radio.forEach( region => fetchStationsForRegion( region.apiName )( dispatch, getState ) );
  };
}

export function reloadAllStations(): Thunk {
  return function( dispatch: Dispatch, getState: GetState ) {
    getState().media.radio.forEach( region => reloadStationsForRegion( region.apiName )( dispatch, getState ) );
  };
}
