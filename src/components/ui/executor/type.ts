import { MouseEventHandler } from "react";
import { TArtist, TPlaylist, TTrack } from "../../../utils/types"

export type ExecutorUIProps = {
  executor: TArtist;
  playlists: TPlaylist[];
  tracks: TTrack[];
  executors: TArtist[];
  listenHandle: MouseEventHandler;
}