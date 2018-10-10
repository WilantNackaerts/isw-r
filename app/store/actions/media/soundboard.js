// @flow
import { SOUNDBOARD_SETSOUNDS } from '../../actions';

type SoundboardSetSoundAction = {
  type: typeof SOUNDBOARD_SETSOUND,
  sounds: [],
  folders: [],
  soundsNF: [],
}

export function soundboardSetSounds( sounds, folders, soundsNF ): SoundboardSetSoundAction {
  return {
    type: SOUNDBOARD_SETSOUNDS,
    sounds,
    folders,
    soundsNF,
  };
}

