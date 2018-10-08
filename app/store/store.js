// @flow

import { createStore } from 'redux';

const reactDevtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

function reducer( state = { test: 'test' }, action ) {
  switch ( action.type ) {
    case 'setTest':
      return { ...state, test: action.test };
    default:
      return state;

  }
}

export default createStore( reducer, reactDevtoolsExtension ); 
