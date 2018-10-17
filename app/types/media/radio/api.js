// @flow

export type Station = {
  command: string,
  params: string,
  TITLE: string,
  logo: string,
};

export type StationsResponse = {
  stations: Station[],
};
