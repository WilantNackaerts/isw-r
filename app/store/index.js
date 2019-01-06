// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { DEVELOPMENT } from '/config';

import shop from './reducers/shop';
import soundboard from './reducers/media/soundboard';
import youtube from './reducers/media/youtube';
import radio from './reducers/media/radio';
import player from './reducers/media/player';
import airco from './reducers/airco';

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
  airco,
} );

export default createStore( rootReducer, devtools( applyMiddleware( ...middleware ) ) ); 
