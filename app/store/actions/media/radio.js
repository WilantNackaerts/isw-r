// @flow

import * as actions from '../../actionTypes/media/radio.js';
import { MEDIA_API_URL } from '../../../config.js';
import type { Station } from '../../reducers/media/radio.js';
import type { Dispatch, GetState } from 'redux';

type FetchStartAction = {
  type: typeof actions.FETCH_START,
  region: string,
};

type FetchEndAction = {
  type: typeof actions.FETCH_END,
  region: string,
  stations: Station[],
};

type ApiStation = {
  command: string,
  params: string,
  TITLE: string,
  logo: string,
};

type ApiStations = {
  stations: ApiStation[],
};

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

export function fetchStationsForRegion( region: string ) {
  return function( dispatch: Dispatch ) {
    dispatch( startFetchStations( region ) );

    fetch( `${MEDIA_API_URL}/${region}/list` )
      .then( response => response.json() )
      .then( ( response: ApiStations ) => {
        const stations = response.stations.map( station => ( {
          name: station.TITLE,
          url: `${station.command}/${station.params}`,
          logo: station.logo,
        } ) );

        dispatch( endFetchStations( region, stations ) );
      } );
  };
}

export function fetchAllStations() {
  return function( dispatch: Dispatch, getState: GetState ) {
    getState().radio.forEach( region => fetchStationsForRegion( region.apiName )( dispatch ) );
  };
}
