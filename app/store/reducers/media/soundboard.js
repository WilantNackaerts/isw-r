// @flow

import * as actions from '../../../types/media/soundboard/actions.js';
import type { State } from '../../../types/media/soundboard';
import type { Action } from '../../../types';

const defaultState = (): State => ( {
  isLoading: true,
  sounds: [],
  folders: [],
  soundsNF: [],
} );

export default function soundboardReducer( state: State = defaultState(), action: Action ): State {
  switch ( action.type ) {
    case actions.SET_SOUNDS:
      return { ...state, isLoading: false, sounds: action.sounds, folders: action.folders, soundsNF: action.soundsNF };
    default:
      return state;
  }
}
