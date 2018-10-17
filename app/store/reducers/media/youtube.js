// @flow
 
import * as actions from '../../actionTypes/media/youtube.js';

export default function youtubeReducer( state: any = { song: '' }, action: any ) {
  switch ( action. type ) {
    case actions.SET_SONG:
      return { ...state, song: action.song };
    default:
      return state;
  }
}
