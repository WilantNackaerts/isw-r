// @flow
import * as actions from '/types/media/soundboard/actions';
import { catcher } from '/util/error.js';
import { SOUNDBOARD_URL } from '/config';
import type {
  Item,
  ApiSound,
  FetchStartAction,
  FetchEndAction,
  FetchFailAction,
  ReloadAction,
  SetSearchAction,
} from '/types/media/soundboard';
import type { Thunk, Dispatch } from '/types';

function compare( { name: a }: Item, { name: b }: Item ): number {
  return a < b ? -1 : a === b ? 0 : 1;
}

function itemFromPath( path: string ): { path: string, name: string, basename: string, label: string } {
  const parts = path.split( '/' );
  const label = parts.pop();
  const basename = parts.join( '/' ) + '/';

  return { path, label, basename, name: label.toLowerCase() };
}

function process( res: ApiSound[] ): Item[] {
  const folderNames = new Set<string>();
  const sounds: Item[] = [];

  res.forEach( sound => {
    if ( sound.params.includes( '/' ) ) {
      const parts = sound.params.split( '/' );
      let path = [];

      parts.slice( 0, -1 ).forEach( part => {
        path.push( part );
        folderNames.add( path.join( '/' ) );
      } );
    }

    sounds.push( { ...itemFromPath( sound.TITLE ), isFolder: false } );
  } );

  const folders = Array.from( folderNames )
    .sort()
    .map( path => ( { ...itemFromPath( path ), isFolder: true } ) );
    
  sounds.sort( compare );

  return folders.concat( sounds );
}

function _fetchStart(): FetchStartAction {
  return {
    type: actions.FETCH_START,
  };
}

function _fetchEnd( items: Item[] ): FetchEndAction {
  return {
    type: actions.FETCH_END,
    items,
  };
}

function _fetchFail( soft?: boolean = false ): FetchFailAction {
  return {
    type: actions.FETCH_FAIL,
    soft,
  };
}

function _reload(): ReloadAction {
  return {
    type: actions.RELOAD,
  };
}

export function setSearch( term: string ): SetSearchAction {
  return {
    type: actions.SET_SEARCH,
    searchterm: term,
  };
}

export function clearSearch(): SetSearchAction {
  return {
    type: actions.SET_SEARCH,
    searchterm: '',
  };
}

function _fetchSounds( dispatch: Dispatch ): Promise<ApiSound[]> {
  return fetch( SOUNDBOARD_URL )
    .then( res => res.json() )
    .then( res => {
      dispatch( _fetchEnd( process( res ) ) );
    } );
}

export function fetchSounds(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _fetchStart() );

    _fetchSounds( dispatch )
      .catch( () => dispatch( _fetchFail() ) );
  };
}

export function reloadSounds(): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( _reload() );

    _fetchSounds( dispatch )
      .catch( catcher( 'Oops! Failed to load sound effects.', () => dispatch( _fetchFail( true ) ) ) );
  };
}
