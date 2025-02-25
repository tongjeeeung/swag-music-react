import { MouseEventHandler, ReactNode } from "react";

export type TPlaylist = {
  name: string;
  executor: string;
  executorId: string;
  information: string;
  image: string | File;
  isAdd: boolean;
  isShuffle: boolean;
  id: string | undefined;
  children: ReactNode;
  addPlaylistHandle: MouseEventHandler;
  listenHandle: MouseEventHandler;
  shuffleHandle: MouseEventHandler;
  isOwner: boolean;
  changeHandle: MouseEventHandler;
};
