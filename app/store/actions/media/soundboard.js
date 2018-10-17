// @flow
import * as actions from '../../actionTypes/media/soundboard.js';

type SoundboardSetSoundAction = {
  type: typeof actions.SET_SOUNDS,
  sounds: [string],
  folders: [string],
  soundsNF: [string],
}

export function soundboardSetSounds( sounds: [string], folders: [string], soundsNF: [string] ): SoundboardSetSoundAction {
  return {
    type: actions.SET_SOUNDS,
    sounds,
    folders,
    soundsNF,
  };
}

