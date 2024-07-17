import { FC, useState } from "react";
import { CreatePlaylistUI } from "../ui";
import { useDispatch, useSelector } from "../../services/store";
import { getPlaylists, postNewUserPlaylistThunk } from "../../services/playlistsSlice";
import { TPlaylist, TTrack } from "../../utils/types";
import { getUser } from "../../services/userSlice";
import { useNavigate } from "react-router-dom";

export const CreatePlaylist: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const [name, setName] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [selectedTracks, setSelectedTracks] = useState<TTrack[]>([]);
  const [image, setImage] = useState<File | string>('');

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
      _id: '',
      name: name,
      executor: user!.name,
      image: image!,
      information: info ? info : ' ',
      tracks: selectedTracks,
      executorID: user!._id,
      executorImg: user?.avatar
    }
    dispatch(postNewUserPlaylistThunk(createPlaylist));
    navigate(`/profile`);
  }

  return (<CreatePlaylistUI name={name} setName={setName} image={image} setImage={setImage} info={info} setInfo={setInfo} selectedTracks={selectedTracks} setSelectedTracks={setSelectedTracks} handleSubmit={handleSubmit} tracks={tracks}></CreatePlaylistUI>)
}