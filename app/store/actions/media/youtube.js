// @flow

import * as actions from '../../actionTypes/media/youtube.js';

type YoutubeSetSongAction = {
  type: typeof actions.SET_SONG,
  song: string,
}

export function youtubeSetSong( song: string ): YoutubeSetSongAction {
  return {
    type: actions.SET_SONG,
    song,
  };
}
