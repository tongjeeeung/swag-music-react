import { MouseEventHandler } from "react";

export type TTrack = {
  name: string;
  executor: string;
  isLike: boolean;
  duration: string;
  id: string;
  executorID: string;
  index: number;
  imgUrl: string;
  albumName: string;
  showPlayButton: boolean;
  albumId: string;
  showPlayButtonHandler: (isShow: boolean) => void;
  likeVoid: MouseEventHandler;
  playVoid: MouseEventHandler;
};
