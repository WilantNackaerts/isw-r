// @flow

import Shop from '../screens/Shop.js';
import Media from '../screens/Media.js';
import Airco from '../screens/Airco.js';
import Cams from '../screens/Cams.js';

export const SHOP: 'shop' = 'shop';
export const MEDIA: 'media' = 'media';
export const AIRCO: 'airco' = 'airco';
export const CAMS: 'cams' = 'cams';

export default {
  [ SHOP ]: Shop,
  [ MEDIA ]: Media,
  [ AIRCO ]: Airco,
  [ CAMS ]: Cams,
};
