// @flow

import * as actions from '../../actionTypes/media/soundboard.js';

export default function soundboardReducer( state: any = { isLoading: true }, action: any ) {
  switch ( action.type ) {
    case actions.SET_SOUNDS:
      return { ...state, isLoading: false, sounds: action.sounds, folders: action.folders, soundsNF: action.soundsNF };
    default:
      return state;
  }
}
