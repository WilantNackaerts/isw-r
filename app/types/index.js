// @flow

import type { Action as MediaAction, State as MediaState } from './media';
import type { Action as ShopAction, State as ShopState } from './shop';
import type { Action as AircoAction, State as AircoState } from './airco';

export type Thunk = ( dispatch: Dispatch, getState: GetState ) => void;
export type Dispatch = ( action: Action | Thunk ) => void;
export type GetState = () => State;

export type Action = MediaAction | ShopAction | AircoAction;

export type State = {|
  media: MediaState,
  shop: ShopState,
  airco: AircoState
|};
