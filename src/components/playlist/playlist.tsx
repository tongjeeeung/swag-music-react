import { FC, useEffect } from "react";
import { PlaylistUI } from "../ui";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/store";
import {
  getIsLoadingPlaylist,
  getPlaylist,
  getPlaylistByIdThunk,
} from "../../services/playlistsSlice";
import { Track } from "../track";
import { getUser, toggleAddedPlaylistThunk } from "../../services/userSlice";
import { Preloader } from "../ui";
import {
  getPlaylistByIdForCurrentThunk,
  getState,
  postCurrentTrackThunk,
  toggleShuffle,
  truePlaying,
} from "../../services/currentSlice";

export const Playlist: FC = () => {
  const albumId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) {
      dispatch(getPlaylistByIdThunk({ id: albumId.id!, userId: user._id }));
    } else {
      dispatch(getPlaylistByIdThunk({ id: albumId.id!, userId: "" }));
    }
  }, []);

  useEffect(() => {
    if (albumId.id == user?.likedPlaylist._id && user) {
      dispatch(getPlaylistByIdThunk({ id: albumId.id!, userId: user._id }));
    }
  }, [user?.likedTracks.length]);

  const isLoading = useSelector(getIsLoadingPlaylist);
  const album = useSelector(getPlaylist);
  const isAdd = user?.addedPlaylists.find(
    (playlistID) => playlistID === album?._id,
  )
    ? true
    : false;
  const isShuffle = useSelector(getState).shuffle;
  const isOwner = album?.executorID === user?._id ? true : false;

  const addPlaylistHandle = () => {
    if (user) {
      dispatch(toggleAddedPlaylistThunk(albumId.id!));
    } else {
      navigate("/swag-music-react/login");
    }
  };

  const listenHandle = () => {
    const randId =
      album!.tracks[Math.floor(Math.random() * album!.tracks.length)]._id;
    dispatch(postCurrentTrackThunk(randId));
    dispatch(
      getPlaylistByIdForCurrentThunk({
        id: album!._id,
        userId: user ? user._id : "",
      }),
    );
    dispatch(truePlaying());
  };

  const shuffleHandle = () => {
    dispatch(toggleShuffle());
  };

  const changeHandle = () => {
    navigate(`/swag-music-react/playlists/update/${albumId.id}`);
  };

  return (
    <>
      {isLoading ? (
        <Preloader></Preloader>
      ) : (
        <>
          {album === null ? (
            <Preloader></Preloader>
          ) : (
            <PlaylistUI
              name={album ? album.name : ""}
              executor={album ? album.executor : ""}
              executorId={album.executorID ? album.executorID : ""}
              image={album ? album.image : ""}
              isAdd={isAdd}
              changeHandle={changeHandle}
              isShuffle={isShuffle}
              isOwner={isOwner}
              information={album ? album.information : ""}
              id={albumId.id}
              addPlaylistHandle={addPlaylistHandle}
              listenHandle={listenHandle}
              shuffleHandle={shuffleHandle}
            >
              {album!.tracks.length > 0 ? (
                album!.tracks.map((item, index) => (
                  <Track
                    index={index + 1}
                    name={item.name}
                    executor={item.executor}
                    duration={item.duration}
                    _id={item._id}
                    imgUrl={item.image}
                    albumName={item.albumName ? item.albumName : ""}
                    key={item._id}
                    executorID={item.executorID}
                    playlistID={album._id}
                  ></Track>
                ))
              ) : (
                <></>
              )}
            </PlaylistUI>
          )}
        </>
      )}
    </>
  );
};
