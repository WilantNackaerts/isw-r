// @flow

import * as actions from '/types/media/player/actions';
import type { FetchStartAction, FetchEndAction, Song } from '/types/media/player';
import type { Thunk, Dispatch } from '/types';
import { PLAYER_URL } from '/config';

function fetchStart(): FetchStartAction {
  return {
    type: actions.FETCH_START,
  };
}

function fetchEnd( currentSong: Song, muted: boolean, paused: boolean, volume: number ): FetchEndAction {
  return {
    type: actions.FETCH_END,
    currentSong,
    muted,
    paused,
    volume,
  };
}

export function fetchPlayer(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( fetchStart() );
    
    fetch( PLAYER_URL )
      .then( res => res.json() )
      .then( res => {
        dispatch( fetchEnd( res.current, res.muted, res.paused, res.volume ) );
      } )
      .catch( console.error );
  };
}
