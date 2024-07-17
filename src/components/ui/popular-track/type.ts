import { MouseEventHandler } from "react";

export type TPopularTrack = {
  name: string;
  executor: string;
  isLike: boolean;
  duration: string;
  likeVoid: MouseEventHandler;
  playVoid: MouseEventHandler;
}