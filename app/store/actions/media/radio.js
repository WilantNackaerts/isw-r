// @flow

import * as actions from '/types/media/radio/actions';
import { MEDIA_API_URL } from '/config';
import type { Thunk, Dispatch, GetState } from '/types';
import type { Station, StationsResponse, FetchStartAction, FetchEndAction, FetchFailAction } from '/types/media/radio';

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

export function _fetchStationsFail( region: string ): FetchFailAction {
  console.log( 'Creating fetch stations fail action' );
  return {
    type: actions.FETCH_FAIL,
    region,
  };
}

export function fetchStationsForRegion( region: string ): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _fetchStationsStart( region ) );

    fetch( `${MEDIA_API_URL}/${region}/list`, { timeout: 2000 } )
      .then( response => response.json() )
      .then( ( response: StationsResponse ) => {
        const stations = response.stations.map( station => ( {
          name: station.TITLE,
          url: `${station.command}/${station.params}`,
          logo: station.logo,
        } ) );

        dispatch( _fetchStationsEnd( region, stations ) );
      } )
      .catch( () => dispatch( _fetchStationsFail( region ) ) );
  };
}

export function fetchAllStations(): Thunk {
  return function( dispatch: Dispatch, getState: GetState ) {
    getState().media.radio.forEach( region => fetchStationsForRegion( region.apiName )( dispatch, getState ) );
  };
}
