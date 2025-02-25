import { FC, useState } from "react";
import { TrackUI } from "../ui";
import { useDispatch, useSelector } from "../../services/store";
import { getUser, toggleLikeTrackThunk } from "../../services/userSlice";
import { TTrack } from "./type";
import {
  getPlaylistByIdForCurrentThunk,
  getState,
  postCurrentTrackThunk,
  togglePlaying,
  truePlaying,
} from "../../services/currentSlice";
import { useNavigate } from "react-router-dom";

export const Track: FC<TTrack> = ({
  name,
  executor,
  duration,
  _id,
  executorID,
  playlistID,
  index,
  imgUrl,
  albumName,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const current = useSelector(getState);
  const [showPlayButton, setShowPlayButton] = useState(false);
  let like = undefined;

  if (user?.likedTracks) {
    like = user.likedTracks.find((id) => id === _id);
  }

  const playing = current.current._id === _id && current.playing ? true : false;

  const likeHandle = () => {
    if (user) {
      dispatch(toggleLikeTrackThunk(_id));
    } else {
      navigate("/swag-music-react/login");
    }
  };

  const playHandle = () => {
    if (current.current._id !== _id) {
      dispatch(postCurrentTrackThunk(_id));
      dispatch(
        getPlaylistByIdForCurrentThunk({
          id: playlistID,
          userId: user ? user._id : "",
        }),
      );
      dispatch(truePlaying());
    } else dispatch(togglePlaying());
  };

  const showPlayButtonHandler = (isShow: boolean) => {
    setShowPlayButton(isShow);
  };

  return (
    <TrackUI
      showPlayButtonHandler={showPlayButtonHandler}
      showPlayButton={showPlayButton}
      imgUrl={imgUrl}
      albumName={albumName}
      index={index}
      name={name}
      executor={executor}
      duration={duration}
      id={_id}
      playVoid={playHandle}
      likeVoid={likeHandle}
      isLike={like ? true : false}
      isPlaying={playing}
      executorID={executorID}
      albumId={playlistID}
    ></TrackUI>
  );
};
