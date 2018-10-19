// @flow

import type { GetState } from 'redux';
import type { Action as MediaAction, State as MediaState } from './media';

export type Thunk = ( dispatch: Dispatch, getState: GetState ) => void;
export type Dispatch = ( action: Action | Thunk ) => void;

export type Action = MediaAction;

export type State = {
  media: MediaState,
};
