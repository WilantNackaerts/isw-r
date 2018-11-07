// @flow

import * as actions from '/types/media/player/actions';
import type { State } from '/types/media/player';
import type { Action } from '/types';

const defaultState = (): State => ( {
  currentSong: { title: '', thumb: '', position: 0, length: 0 },
  muted: true,
  paused: true,
  volume: 0,
} );

export default function playerReducer( state: State = defaultState(), action: Action ): State {
  switch ( action.type ) {
    case actions.FETCH_START:
      return { ...state };
    case actions.FETCH_END:
      return { ...state, currentSong: action.currentSong, muted: action.muted, paused: action.paused, volume: action.volume };
    case actions.PLAY:
      return { ...state, paused: false };
    case actions.PAUSE:
      return { ...state, paused: true };
    case actions.VOLUME:
      return { ...state, volume: action.volume };
    default:
      return state;
  }
}
