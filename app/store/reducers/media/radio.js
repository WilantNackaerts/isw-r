// @flow

import * as actions from '../../actionTypes/media/radio.js';

export type Station = {
  name: string,
  logo: string,
  url: string,
};

export type Region = {
  name: string,
  apiName: string,
  loading: boolean,
  stations: Station[],
};

function createDefaultState(): Region[] {
  return [ {
    name: 'VRT',
    apiName: 'vrt',
    loading: true,
    stations: [],
  }, {
    name: 'Belgium',
    apiName: 'be',
    loading: true,
    stations: [],
  } ];
}

function regionReducer( state: Region, action: any ): Region {
  if ( action.region === state.apiName ) {
    switch ( action.type ) {
      case actions.FETCH_START:
        return { ...state, loading: true };
      case actions.FETCH_END:
        return { ...state, loading: false, stations: action.stations };
      default:
        return state;
    }
  }
  
  return state;
}

export default function radioReducer( state: Region[] = createDefaultState(), action: any ): Region[] {
  switch ( action.type ) {
    case actions.FETCH_START:
    case actions.FETCH_END:
      return state.map( region => regionReducer( region, action ) );
    default:
      return state;
  }
}
