// @flow

import { SHOP_TEST } from '../actions.js';

type ShopTestAction = {
  type: typeof SHOP_TEST,
  test: string
}

export function shopTest(): ShopTestAction {
  return {
    type: SHOP_TEST,
    test: 'ldnfkehrbf',
  };
}
