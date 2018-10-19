// @flow

import * as actions from '../../../types/media/radio/actions.js';
import { MEDIA_API_URL } from '../../../config.js';
import type { Thunk, Dispatch, GetState } from '../../../types';
import type { Station, StationsResponse, FetchStartAction, FetchEndAction } from '../../../types/media/radio';

export function startFetchStations( region: string ): FetchStartAction {
  return {
    type: actions.FETCH_START,
    region,
  };
}

export function endFetchStations( region: string, stations: Station[] ): FetchEndAction {
  return {
    type: actions.FETCH_END,
    region,
    stations,
  };
}

export function fetchStationsForRegion( region: string ): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( startFetchStations( region ) );

    fetch( `${MEDIA_API_URL}/${region}/list` )
      .then( response => response.json() )
      .then( ( response: StationsResponse ) => {
        const stations = response.stations.map( station => ( {
          name: station.TITLE,
          url: `${station.command}/${station.params}`,
          logo: station.logo,
        } ) );

        dispatch( endFetchStations( region, stations ) );
      } );
  };
}

export function fetchAllStations(): Thunk {
  return function( dispatch: Dispatch, getState: GetState ) {
    getState().media.radio.forEach( region => fetchStationsForRegion( region.apiName )( dispatch, getState ) );
  };
}
