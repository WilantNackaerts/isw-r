// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { DEVELOPMENT } from '../config.js';

import shop from './reducers/shop.js';
import soundboard from './reducers/media/soundboard.js';
import youtube from './reducers/media/youtube.js';
import radio from './reducers/media/radio.js';

const devtools =
  (
    DEVELOPMENT &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) ||
  compose;

const middleware = [ ReduxThunk ];

const rootReducer = combineReducers( {
  shop,
  media: combineReducers( {
    soundboard,
    youtube,
    radio,
  } ),
} );

export default createStore( rootReducer, devtools( applyMiddleware( ...middleware ) ) ); 
