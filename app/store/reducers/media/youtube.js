// @flow
 
import { YOUTUBE_SETSONG } from '../../actions.js';

export default function youtubeReducer( state: any = { song: '' }, action: any ) {
  switch ( action. type ) {
    case YOUTUBE_SETSONG:
      return { ...state, song: action.song };
    default:
      return state;
  }
}
