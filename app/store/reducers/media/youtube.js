// @flow
 
import * as actions from '/types/media/youtube/actions';
import type { State } from '/types/media/youtube';
import type { Action } from '/types';

const defaultState = (): State => ( {
  songs: [],
  isLoading: true,
} );

export default function youtubeReducer( state: any = defaultState(), action: Action ): State {
  switch ( action. type ) {
    case actions.FETCH_START:
      return { ...state, isLoading: true };
    case actions.FETCH_END:
      return { ...state, isLoading: false, songs: action.songs };
    default:
      return state;
  }
}
