// @flow

import * as actions from '/types/airco/actions';
import type {
  TogglePowerAction,
  SetTempAction,
  SetFanPowerAction,
  ToggleFanAutoAction,
} from '/types/airco';

export function togglePower(): TogglePowerAction {
  return {
    type: actions.TOGGLE_POWER,
  };
}

export function setTemp( temp: number ): SetTempAction {
  return {
    type: actions.SET_TEMP,
    value: temp,
  };
}

export function setFanPower( power: number ): SetFanPowerAction {
  return {
    type: actions.SET_FAN_POWER,
    value: power,
  };
}

export function toggleFanAuto(): ToggleFanAutoAction {
  return {
    type: actions.TOGGLE_FAN_AUTO,
  };
}
