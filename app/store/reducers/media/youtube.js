// @flow
 
import * as actions from '/types/media/youtube/actions';
import type { State } from '/types/media/youtube';
import type { Action } from '/types';

const defaultState = (): State => ( {
  songs: [],
} );

export default function youtubeReducer( state: any = defaultState(), action: Action ): State {
  switch ( action. type ) {
    case actions.FETCH_START:
      return { ...state };
    case actions.FETCH_END:
      return { ...state, songs: action.songs };
    default:
      return state;
  }
}
