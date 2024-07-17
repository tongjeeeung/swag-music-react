import { MouseEventHandler } from "react";

export type TTrack = {
  name: string;
  executor: string;
  isLike: boolean;
  duration: string;
  id: string;
  executorID: string;
  likeVoid: MouseEventHandler;
  playVoid: MouseEventHandler;
}