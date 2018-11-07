// @flow

import * as actions from '/types/media/player/actions';
import type { FetchStartAction, FetchEndAction, PlayAction, PauseAction, VolumeAction, Song } from '/types/media/player';
import type { Thunk, Dispatch } from '/types';
import { MEDIA_STATUS_URL, MEDIA_API_URL } from '/config';

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

function _play(): PlayAction {
  return {
    type: actions.PLAY,
  };
}

function _pause(): PauseAction {
  return {
    type: actions.PAUSE,
  };
}

function _volume( value: number ): VolumeAction {
  return {
    type: actions.VOLUME,
    volume: value,
  };
}

export function fetchPlayer(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( fetchStart() );
    
    fetch( MEDIA_STATUS_URL )
      .then( res => res.json() )
      .then( res => {
        dispatch( fetchEnd( res.current, res.muted, res.paused, res.volume ) );
      } )
      .catch( console.error );
  };
}

export function play(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _play() );

    fetch( MEDIA_API_URL + '/play' )
      .catch( err => console.error );
  };
}

export function pause(): Thunk {
  return function ( dispatch: Dispatch ) {
    dispatch( _pause() );

    fetch( MEDIA_API_URL + '/pause' )
      .catch( err => console.error );
  };
}

export function volume( value: number ): Thunk {
  return function ( dispatch: Dispatch ) {
    dispatch( _volume( value ) );

    fetch( MEDIA_API_URL + '/volume/' + value )
      .catch( err => console.error );
  };
}
