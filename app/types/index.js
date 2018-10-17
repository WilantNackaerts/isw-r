// @flow

import type { Dispatch, GetState } from 'redux';

export type Thunk = ( dispatch: Dispatch, getState: GetState ) => void
