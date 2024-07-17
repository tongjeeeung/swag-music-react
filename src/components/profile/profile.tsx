import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { getUser, updateUserProfileThunk } from "../../services/userSlice";
import { ProfileUI } from "../ui";
import { useLocation } from "react-router-dom";
import { getUserPlaylists, getUserPlaylistsThunk } from "../../services/playlistsSlice";

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(getUser);
  const [avatar, setAvatar] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const userAlbums = useSelector(getUserPlaylists);

  useEffect(() => {
    if (user) {
      dispatch(getUserPlaylistsThunk(user.addedPlaylists));
    }
  }, [user?.addedPlaylists])

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar)
      setEmail(user.email)
      setName(user.name)
      setEdit(false)
    }
  }, [user?.name, user?.avatar, user?.email])

  const editToggleHandle = () => {
    setEdit(!edit);
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(updateUserProfileThunk({name, email, avatar}))
    setEdit(false)
  }

  return (
    <ProfileUI 
    name={name}
    setName={setName}
    email={email}
    setEmail={setEmail}
    avatar={avatar}
    setAvatar={setAvatar}
    edit={edit}
    editHadnle={editToggleHandle}
    handleSubmit={handleSubmit}
    locationState={{background: location}}
    userAlbums={userAlbums ? userAlbums : []}>
    </ProfileUI>)
}