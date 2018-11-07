// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { DEVELOPMENT } from '/config';

import shop from './reducers/shop';
import soundboard from './reducers/media/soundboard';
import youtube from './reducers/media/youtube';
import radio from './reducers/media/radio';
import player from './reducers/media/player';

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
    player,
  } ),
} );

export default createStore( rootReducer, devtools( applyMiddleware( ...middleware ) ) ); 
