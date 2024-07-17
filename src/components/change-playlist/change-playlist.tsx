import { FC, useState } from "react";
import { CreatePlaylistUI } from "../ui";
import { useDispatch, useSelector } from "../../services/store";
import { deleteUserPlaylistThunk, getAllPlaylistsThunk, getPlaylist, getPlaylists, ubdateUserPlaylistThunk } from "../../services/playlistsSlice";
import { TPlaylist, TTrack } from "../../utils/types";
import { getUser } from "../../services/userSlice";
import { useNavigate } from "react-router-dom";

export const CangePlaylist: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const playlist = useSelector(getPlaylist);
  const [name, setName] = useState<string>(playlist!.name);
  const [info, setInfo] = useState<string>(playlist!.information);
  const [selectedTracks, setSelectedTracks] = useState<TTrack[]>(playlist!.tracks);
  const [image, setImage] = useState<File | string>(playlist!.image);

  const uniqueTracks: TTrack[] = [];
  
  useSelector(getPlaylists)?.map((playlist) => {
    playlist.tracks.map((track) => {
      uniqueTracks.push(track)
    })
  })

  const tracks: TTrack[] = Array.from(new Set(uniqueTracks.map(track => JSON.stringify(track))))
  .map(track => JSON.parse(track));

  const handleSubmit = () => {
    const createPlaylist: TPlaylist = {
      _id: playlist!._id,
      name: name,
      executor: user!.name,
      image: image!,
      information: info ? info : ' ',
      tracks: selectedTracks,
      executorID: user!._id,
      executorImg: user?.avatar
    }

    dispatch(ubdateUserPlaylistThunk(createPlaylist));
    dispatch(getAllPlaylistsThunk())
    navigate(-1);
  }

  const handleDeletePlaylist = () => {
    dispatch(deleteUserPlaylistThunk(playlist!))
    navigate('/home');
  }

  return (<CreatePlaylistUI name={name} setName={setName} image={image} setImage={setImage} info={info} setInfo={setInfo} selectedTracks={selectedTracks} setSelectedTracks={setSelectedTracks} handleSubmit={handleSubmit} tracks={tracks} handleDeletePlaylist={handleDeletePlaylist} id={playlist?._id}></CreatePlaylistUI>)
}