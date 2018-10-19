// @flow
import * as actions from '/types/media/soundboard/actions';
import { SOUNDBOARD_URL } from '/config';
import type { Item, ApiSound, FetchStartAction, FetchEndAction } from '/types/media/soundboard';
import type { Thunk, Dispatch } from '/types';

function compare( { name: a }: Item, { name: b }: Item ): number {
  return a < b ? -1 : a === b ? 0 : 1;
}

function nameFromPath( path: string ): string {
  return path.split( '/' ).pop();
}

function process( res: ApiSound[] ): Item[] {
  const folderNames = new Set<string>();
  const sounds = [];

  res.forEach( sound => {
    if ( sound.params.includes( '/' ) ) {
      const parts = sound.params.split( '/' );
      let path = [];

      parts.slice( 0, -1 ).forEach( part => {
        path.push( part );
        folderNames.add( path.join( '/' ) );
      } );
    }

    sounds.push( { name: nameFromPath( sound.TITLE ), path: sound.params, isFolder: false } );
  } );

  const folders = Array.from( folderNames )
    .sort()
    .map( path => ( { name: nameFromPath( path ), path, isFolder: true } ) );
    
  sounds.sort( compare );

  return folders.concat( sounds );
}

function fetchStart(): FetchStartAction {
  return {
    type: actions.FETCH_START,
  };
}

function fetchEnd( items: Item[] ): FetchEndAction {
  return {
    type: actions.FETCH_END,
    items,
  };
}

export function fetchSounds(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( fetchStart() );

    fetch( SOUNDBOARD_URL )
      .then( res => res.json() )
      .then( res => {
        dispatch( fetchEnd( process( res ) ) );
      } )
      .catch( console.error );
  };
}
