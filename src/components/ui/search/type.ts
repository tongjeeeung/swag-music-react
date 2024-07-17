import { TArtist } from "../../../utils/types";

export type SearchUIProps = {
  artists: TArtist[];
  handleSearch(): void;
}

export type SearchFunction = (searchElement: string) => SearchResult[];
export type CachedFunction = (n: string) => SearchResult[];

export type SearchResult = {
  type: 'executor' | 'playlists' | 'track';
  name: string;
  id: string;
  albumId?: string;
};