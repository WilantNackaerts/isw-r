// @flow

import * as actions from '/types/media/soundboard/actions';
import type { State } from '/types/media/soundboard';
import type { Action } from '/types';

const defaultState = (): State => ( {
  loading: true,
  failed: false,
  reloading: false,
  items: [],
  searchterm: '',
} );

const rfilterSearch = /[^a-z0-9]/ig;

export default function soundboardReducer( state: State = defaultState(), action: Action ): State {
  switch ( action.type ) {
    case actions.FETCH_START:
      return { ...state, loading: true };
    case actions.FETCH_END:
      return { ...state, loading: false, failed: false, reloading: false, items: action.items };
    case actions.FETCH_FAIL:
      return { ...state, loading: false, failed: !action.soft, reloading: false };
    case actions.RELOAD:
      return { ...state, reloading: true };
    case actions.SET_SEARCH:
      return { ...state, searchterm: action.searchterm.replace( rfilterSearch, '' ) };
    default:
      return state;
  }
}
