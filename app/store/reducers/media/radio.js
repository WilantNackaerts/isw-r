import { RADOI_SETSTATIONS } from "../../actions";


// @flow

export default function radioReducer( state: any, action: any ) {
  switch ( action.type ) {
    case RADOI_SETSTATIONS:
      return { ...state, action.}
    default:
      return state;
  }
}
