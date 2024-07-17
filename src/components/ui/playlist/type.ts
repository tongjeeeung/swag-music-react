import { MouseEventHandler, ReactNode } from "react";

export type TPlaylist = {
  name: string;
  executor: string;
  information: string;
  image: string | File;
  isAdd: boolean;
  isShuffle: boolean;
  id: string | undefined;
  children: ReactNode;
  addPlaylistHandle: MouseEventHandler;
  shuffleHandle: MouseEventHandler;
  isOwner: boolean;
  changeHandle: MouseEventHandler;
}