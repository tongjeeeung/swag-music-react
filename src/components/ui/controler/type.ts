import { MouseEventHandler } from "react";

export type TControler = {
  image: string;
  name: string;
  executorID: string;
  executor: string;
  duration: string;
  trackTimer: string,
  isLike: boolean;
  isPlaying: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  volumeWidth: number;
  shuffleVoid: MouseEventHandler;
  prevVoid: MouseEventHandler;
  nextVoid: MouseEventHandler;
  repeatVoid: MouseEventHandler;
  volumeVoid(arg: number): void;
  volumeButtonVoid: MouseEventHandler;
  likeVoid: MouseEventHandler;
  playVoid: MouseEventHandler;
  progressVoid(arg: number): void;
}