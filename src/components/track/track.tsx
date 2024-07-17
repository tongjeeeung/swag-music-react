import { FC } from "react";
import { TrackUI } from "../ui";
import { useDispatch, useSelector } from "../../services/store";
import { getUser, toggleLikeTrackThunk } from "../../services/userSlice";
import { TTrack } from './type';
import { getPlaylistByIdForCurrentThunk, getState, postCurrentTrackThunk, togglePlaying, truePlaying } from "../../services/currentSlice";
import { useNavigate } from "react-router-dom";

export const Track: FC<TTrack> = ({name, executor, duration, _id, executorID, playlistID}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const current = useSelector(getState);
  let like = undefined;

  if (user?.likedTracks) {
    like = user.likedTracks.find((id) => id === _id);
  }

  let playing = false;

  if (current.current._id === _id && current.playing) {
    playing = true;
  }

  const likeHandle = () => {
    if (user) {
      dispatch(toggleLikeTrackThunk(_id));
    }
    else {
      navigate('/login');
    }
  }

  const playHandle = () => {
    if(current.current._id !== _id) {
      dispatch(postCurrentTrackThunk(_id));
      dispatch(getPlaylistByIdForCurrentThunk(playlistID))
      dispatch(truePlaying())
    }
    else dispatch(togglePlaying())
  }

  return <TrackUI name={name} executor={executor} duration={duration} id={_id} playVoid={playHandle} likeVoid={likeHandle} isLike={like ? true : false} isPlaying={playing} executorID={executorID}></TrackUI>
}