// @flow

import { createStore } from 'redux';

export default createStore( function( state = { test: 'test' }, action ) {
  switch ( action.type ) {
    case 'setTest':
      return { ...state, test: action.test };
    default:
      return state;
      
  }
} ); 
