// @flow

export type Station = {
  name: string,
  logo: string,
  url: string,
};

export type Region = {
  name: string,
  apiName: string,
  loading: boolean,
  stations: Station[],
};
