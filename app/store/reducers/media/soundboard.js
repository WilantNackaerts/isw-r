// @flow

import { SOUNDBOARD_SETSOUNDS } from '../../actions.js';

export default function soundboardReducer( state: any = { isLoading: true }, action: any ) {
  switch ( action.type ) {
    case SOUNDBOARD_SETSOUNDS:
      return { ...state, isLoading: false, sounds: action.sounds, folders: action.folders, soundsNF: action.soundsNF };
    default:
      return state;
  }
}
