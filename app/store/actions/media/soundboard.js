// @flow
import { SOUNDBOARD_SETSOUNDS } from '../../actions';

type SoundboardSetSoundAction = {
  type: typeof SOUNDBOARD_SETSOUND,
  sounds: [],
  folders: []
}

export function soundboardSetSounds( sounds, folders ): SoundboardSetSoundAction {
  return {
    type: SOUNDBOARD_SETSOUNDS,
    sounds,
    folders,
  };
}

