// @flow
import { SOUNDBOARD_SETSOUNDS } from '../../actions.js';

type SoundboardSetSoundAction = {
  type: typeof SOUNDBOARD_SETSOUNDS,
  sounds: [string],
  folders: [string],
  soundsNF: [string],
}

export function soundboardSetSounds( sounds, folders, soundsNF ): SoundboardSetSoundAction {
  return {
    type: SOUNDBOARD_SETSOUNDS,
    sounds,
    folders,
    soundsNF,
  };
}

