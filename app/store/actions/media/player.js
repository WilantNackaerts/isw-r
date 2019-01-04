// @flow

import * as actions from '/types/media/player/actions';
import { catcher } from '/util/error.js';
import type {
  FetchStartAction,
  FetchEndAction,
  PlayAction,
  PauseAction,
  VolumeAction,
  ToggleMutedAction,
  NextAction,
  PreviousAction,
  Song,
  ApiStatus,
  ApiSong,
} from '/types/media/player';
import type { Thunk, Dispatch } from '/types';
import { MEDIA_STATUS_URL, MEDIA_API_URL } from '/config';

function fetchStart(): FetchStartAction {
  return {
    type: actions.FETCH_START,
  };
}

function fetchEnd( queue: Song[], currentSong: Song, muted: boolean, paused: boolean, volume: number, queuePosition: number ): FetchEndAction {
  return {
    type: actions.FETCH_END,
    queue,
    currentSong,
    muted,
    paused,
    volume,
    queuePosition,
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

function _toggleMuted(): ToggleMutedAction {
  return {
    type: actions.TOGGLE_MUTED,
  };
}

function _next(): NextAction {
  return {
    type: actions.NEXT,
  };
}

function _previous(): PreviousAction {
  return {
    type: actions.PREVIOUS,
  };
}

function convertSong( song: ApiSong ): Song {
  return {
    title: song.TITLE,
    thumb: song.logo,
    position: 0,
    length: 1,
  };
}

let previousFetchStatusFailed = false;
export function fetchPlayer(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( fetchStart() );
    
    fetch( MEDIA_STATUS_URL )
      .then( res => res.json() )
      .then( ( res: ApiStatus ) => {
        previousFetchStatusFailed = false;
        const queue = res.playlist.map( convertSong );
        dispatch( fetchEnd( queue, res.current, res.muted, res.paused, res.volume, res.plp ) );
      } )
      .catch( err => {
        if ( !previousFetchStatusFailed ) {
          catcher( 'Oops! Failed to fetch player state.' );
        }
        previousFetchStatusFailed = true;
      } );
  };
}

export function play(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _play() );

    fetch( MEDIA_API_URL + '/play' )
      .catch( catcher( 'Oops! Failed to start music.' ) );
  };
}

export function pause(): Thunk {
  return function ( dispatch: Dispatch ) {
    dispatch( _pause() );

    fetch( MEDIA_API_URL + '/pause' )
      .catch( catcher( 'Oops! Failed to pause music.' ) );
  };
}

export function volume( value: number ): Thunk {
  return function ( dispatch: Dispatch ) {
    dispatch( _volume( value ) );

    fetch( MEDIA_API_URL + '/volume/' + value )
      .catch( catcher( 'Oops! Failed to set volume.' ) );
  };
}

export function toggleMuted(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _toggleMuted() );

    fetch( MEDIA_API_URL + '/mute' )
      .catch( catcher( 'Oops! Failed to (un)mute music.' ) );
  };
}

export function next(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _next() );

    fetch( MEDIA_API_URL + '/next' )
      .catch( catcher( 'Oops! Failed to play next song.' ) );
  };
}

export function previous(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _previous() );

    fetch( MEDIA_API_URL + '/previous' )
      .catch( catcher( 'Oops! Failed to play previous song.' ) );
  };
}
