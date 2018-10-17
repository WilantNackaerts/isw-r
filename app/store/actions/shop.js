// @flow

import * as actions from '../actionTypes/shop';

type ShopTestAction = {
  type: typeof actions.TEST,
  test: string
}

export function shopTest(): ShopTestAction {
  return {
    type: actions.TEST,
    test: 'ldnfkehrbf',
  };
}
