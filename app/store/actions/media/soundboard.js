// @flow
import { SOUNDBOARD_SETSOUNDS } from '../../actions';

export function soundboardSetSounds( sounds, folders ): SoundboardSetSoundAction {
  return {
    type: SOUNDBOARD_SETSOUNDS,
    sounds,
    folders,
  };
}

