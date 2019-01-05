// @flow

import * as actions from './actions.js';

export type TogglePowerAction = {
  type: typeof actions.TOGGLE_POWER,
};

export type SetTempAction = {
  type: typeof actions.SET_TEMP,
  value: number,
};

export type SetFanPowerAction = {
  type: typeof actions.SET_FAN_POWER,
  value: number,
};

export type ToggleFanAutoAction = {
  type: typeof actions.TOGGLE_FAN_AUTO,
};

export type Action =
  TogglePowerAction |
  SetTempAction |
  SetFanPowerAction |
  ToggleFanAutoAction;

export type State = {|
  poweredOn: boolean,
  temp: number,
  fanPower: number,
  fanAuto: boolean,
|};
