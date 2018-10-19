// @flow
import * as actions from '../../../types/media/soundboard/actions.js';
import type { Sound, Folder, Item, SetSoundsAction } from '../../../types/media/soundboard';

export function soundboardSetSounds( sounds: Item[], folders: Folder[], soundsNF: Sound[] ): SetSoundsAction {
  return {
    type: actions.SET_SOUNDS,
    sounds,
    folders,
    soundsNF,
  };
}

