// @flow

export const NODE_ENV = process.env.NODE_ENV;
export const DEVELOPMENT = NODE_ENV === 'development';
export const MEDIA_URL = 'http://m.isw';
export const MEDIA_API_URL = MEDIA_URL + '/api';
export const SOUNDBOARD_URL = MEDIA_API_URL + '/sb';
