// @flow

import * as actions from '/types/media/youtube/actions';
import { YOUTUBE_URL } from '/config';
import type { Thunk, Dispatch } from '/types';
import type { Song, FetchStartAction, FetchEndAction, SearchTerm } from '/types/media/youtube';

function fetchStart(): FetchStartAction {
  return {
    type: actions.FETCH_START,
  };
}

function fetchEnd( songs: Song[] ): FetchEndAction {
  return {
    type: actions.FETCH_END,
    songs,
  } ;
}

export function fetchSongs( searchTerm: SearchTerm ): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( fetchStart() );

    fetch( YOUTUBE_URL +  this.searchTerm )
      .then( res => res.json() )
      .then( res => {
        console.log( res );
        dispatch( fetchEnd( res.items ) );
      } )
      .catch( console.error );
  };
}
