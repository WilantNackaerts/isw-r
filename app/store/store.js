// @flow

import { createStore, combineReducers } from 'redux';
import shop from './reducers/shop.js';
import soundboard from './reducers/media/soundboard.js';
import youtube from './reducers/media/youtube.js';
import radio from './reducers/media/radio.js';

const reactDevtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const rootReducer = combineReducers( {
  shop,
  soundboard,
  youtube,
  radio,
} );

export default createStore( rootReducer, reactDevtoolsExtension ); 
