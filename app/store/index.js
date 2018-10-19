// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { DEVELOPMENT } from '/config';

import shop from './reducers/shop';
import soundboard from './reducers/media/soundboard';
import youtube from './reducers/media/youtube';
import radio from './reducers/media/radio';

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
