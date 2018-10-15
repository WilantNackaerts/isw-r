// @flow

import { YOUTUBE_SETSONG } from '../../actions.js';

type YoutubeSetSongAction = {
  type: typeof YOUTUBE_SETSONG,
  song: string,
}

export function youtubeSetSong( song: string ): YoutubeSetSongAction {
  return {
    type: YOUTUBE_SETSONG,
    song,
  };
}
