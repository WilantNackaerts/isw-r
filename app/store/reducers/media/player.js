// @flow

import * as actions from '/types/media/player/actions';
import type { State } from '/types/media/player';
import type { Action } from '/types';

const defaultState = (): State => ( {
  queue: [],
  currentSong: { title: '', thumb: '', position: 0, length: 0 },
  muted: true,
  paused: true,
  volume: 0,
  queuePosition: -1,
} );

const skipTo = ( state: State, index: number ): State => {
  if ( index >= 0 && state.queue && index < state.queue.length ) {
    return { ...state, queuePosition: index, currentSong: state.queue[ index ] };
  }
  else {
    return state;
  }
};

export default function playerReducer( state: State = defaultState(), action: Action ): State {
  switch ( action.type ) {
    case actions.FETCH_START:
      return state;
    case actions.FETCH_END:
      return { 
        ...state,
        queue: action.queue,
        currentSong: action.currentSong,
        muted: action.muted,
        paused: action.paused,
        volume: action.volume,
        queuePosition: action.queuePosition,
      };
    case actions.PLAY:
      return { ...state, paused: false };
    case actions.PAUSE:
      return { ...state, paused: true };
    case actions.VOLUME:
      return { ...state, volume: action.volume };
    case actions.TOGGLE_MUTED:
      return { ...state, muted: !state.muted };
    case actions.NEXT:
      return skipTo( state, state.queuePosition + 1 );
    case actions.PREVIOUS:
      return skipTo( state, state.queuePosition - 1 );
    default:
      return state;
  }
}
