// @flow

import type { Action as MediaAction, State as MediaState } from './media';
import type { Action as ShopAction, State as ShopState } from './shop';

export type Thunk = ( dispatch: Dispatch, getState: GetState ) => void;
export type Dispatch = ( action: Action | Thunk ) => void;
export type GetState = () => State;

export type Action = MediaAction | ShopAction;

export type State = {
  media: MediaState,
  shop: ShopState
};
