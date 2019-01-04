// @flow

import * as actions from '/types/media/youtube/actions';
import { YOUTUBE_URL } from '/config';
import { catcher } from '/util/error.js';
import type { Thunk, Dispatch } from '/types';
import type { Song, FetchStartAction, FetchEndAction } from '/types/media/youtube';

type ApiSearchResponse = {
  etag: string,
  items: ApiSearchResult[],
  kind: 'youtube#searchListResponse',
  nextPageToken: string,
  pageInfo: {
    resultsPerPage: number,
    totalResults: number,
  },
  regionCode: string,
};

type ApiSearchResult = {
  etag: string,
  id: {
    kind: 'youtube#video',
    videoId: string,
  },
  kind: 'youtube#searchResult',
  snippet: {
    channelId: string,
    channelTitle: string,
    description: string,
    publishedAt: string,
    title: string,
    thumbnails: {
      default: ApiThumbnail,
      high: ApiThumbnail,
      medium: ApiThumbnail,
    }
  }
};

type ApiThumbnail = {
  height: number,
  width: number,
  url: string,
};

function fetchStart(): FetchStartAction {
  return {
    type: actions.FETCH_START,
  };
}

function fetchEnd( songs: Song[] ): FetchEndAction { 
  return {
    type: actions.FETCH_END,
    songs,
  } ;
}

function searchResultToSong( res: ApiSearchResult ): Song {
  return {
    id: res.id.videoId,
    title: res.snippet.title,
    description: res.snippet.description,
    thumbnail: res.snippet.thumbnails,
  };
}

export function fetchSongs( searchTerm: string ): Thunk {
  return function( dispatch: Dispatch ) {
    dispatch( fetchStart() );

    fetch( YOUTUBE_URL + searchTerm )
      .then( res => res.json() )
      .then( ( res: ApiSearchResponse ) => {
        dispatch( fetchEnd( res.items.map( searchResultToSong ) ) );
      } )
      .catch( catcher( 'Oops! Failed to fetch search results.' ) );
  };
}
