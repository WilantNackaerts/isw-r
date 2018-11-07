// @flow
import { YOUTUBE_API_KEY } from './secret';

export const NODE_ENV = process.env.NODE_ENV;
export const DEVELOPMENT = NODE_ENV === 'development';
export const MEDIA_URL = 'http://m.isw';
export const MEDIA_API_URL = MEDIA_URL + '/api';
export const SOUNDBOARD_URL = MEDIA_API_URL + '/sb';
export const YOUTUBE_API_URL = MEDIA_API_URL + '/yt/byid'; 
export const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search?type=video&maxResults=10&part=snippet&key='+ YOUTUBE_API_KEY +'&q=';
export const MEDIA_STATUS_URL = MEDIA_API_URL + '/status';
