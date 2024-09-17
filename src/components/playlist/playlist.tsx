import { FC, useEffect } from "react";
import { PlaylistUI } from "../ui";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/store";
import { getIsLoadingPlaylist, getPlaylist, getPlaylistByIdThunk } from "../../services/playlistsSlice";
import { Track } from "../track";
import { getUser, toggleAddedPlaylistThunk } from "../../services/userSlice";
import { Preloader } from '../ui';
import { getState, toggleShuffle } from "../../services/currentSlice";

export const Playlist: FC = () => {
  const albumId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(getPlaylistByIdThunk(albumId.id!))
  }, [])

  const isLoading = useSelector(getIsLoadingPlaylist);
  const album = useSelector(getPlaylist);
  const isAdd = user?.addedPlaylists.find(playlistID => (playlistID === album?._id)) ? true : false;
  const isShuffle = useSelector(getState).shuffle;
  const isOwner = album?.executorID === user?._id ? true : false;

  const addPlaylistHandle = () => {
    if (user) {
      dispatch(toggleAddedPlaylistThunk(albumId.id!));
    }
    else {
      navigate('/swag-music-react/login');
    }
  }

  const shuffleHandle = () => {
    dispatch(toggleShuffle());
  }

  const changeHandle = () => {
    navigate(`/swag-music-react/playlists/update/${albumId.id}`, {state: { background: location.state.background}})
  }

  return <>{isLoading ? (<Preloader></Preloader>) : (<>{album === null ? (<Preloader></Preloader>) : (<PlaylistUI name={album ? album.name : ''} executor={album ? album.executor : ''} image={album ? album.image : ''} isAdd={isAdd} changeHandle={changeHandle} isShuffle={isShuffle} isOwner={isOwner} information={album ? album.information : ''} id={albumId.id} addPlaylistHandle={addPlaylistHandle} shuffleHandle={shuffleHandle}>
    {album!.tracks.length > 0 ? (album!.tracks.map((item) => (<Track name={item.name} executor={item.executor} duration={item.duration} _id={item._id} key={item._id} executorID={item.executorID} playlistID={album._id}></Track>))) : (<></>)}</PlaylistUI>)}</>)}</>
}