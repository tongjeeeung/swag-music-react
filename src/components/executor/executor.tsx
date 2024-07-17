import { FC } from "react";
import { ExecutorUI, Preloader } from "../ui";
import { useDispatch, useSelector } from "../../services/store";
import { getExecutor, getExecutors } from "../../services/executorSlice";
import { TTrack } from "../../utils/types";
import { postCurrentTrackThunk, truePlaying } from "../../services/currentSlice";

export const Executor: FC = () => {
  const dispatch = useDispatch();
  const executor = useSelector(getExecutor);
  const executors = useSelector(getExecutors);
  const playlists = executor?.playlists;
  const _tracks: TTrack[] =  [];
  executor?.playlists.map((playlists) => playlists.tracks.map((track) => {_tracks.push(track)}))

  const listenHandle = () => {
    const randId = _tracks[Math.floor(Math.random() * _tracks.length)]._id
    dispatch(postCurrentTrackThunk(randId))
    dispatch(truePlaying())
  }

  return <>{!executor ? (<Preloader></Preloader>) : (<ExecutorUI executor={executor} playlists={playlists ? playlists : []} tracks={_tracks ? _tracks.slice(0, 15) : []} executors={executors} listenHandle={listenHandle}></ExecutorUI>)}</>
}