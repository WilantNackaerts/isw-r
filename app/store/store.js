// @flow

import { createStore, combineReducers } from 'redux';
import shop from './reducers/shop.js';

const reactDevtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const rootReducer = combineReducers( {
  shop,
} );

export default createStore( rootReducer, reactDevtoolsExtension ); 
