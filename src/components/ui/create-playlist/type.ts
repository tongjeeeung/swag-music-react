import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { TTrack } from "../../../utils/types";

export type CreateIUProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
  info: string;
  setInfo: Dispatch<SetStateAction<string>>;
  tracks: TTrack[];
  selectedTracks: TTrack[];
  setSelectedTracks: Dispatch<SetStateAction<TTrack[]>>;
  image: File | string;
  setImage: Dispatch<SetStateAction<File | string>>;
  handleDeletePlaylist?(): void;
  id?: string
}

export type SearchFunction = (searchElement: string) => TTrack[];
export type CachedFunction = (n: string) => TTrack[];