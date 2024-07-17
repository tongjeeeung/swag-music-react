import { FC } from "react";
import { PlayListListUI } from "../ui";
import { useSelector } from "../../services/store";
import { getPlaylists, getUserPlaylists } from "../../services/playlistsSlice";
import { useLocation } from "react-router-dom";
import { getIsAuth } from "../../services/userSlice";

export const PlayListList: FC = () => {
  const location = useLocation();
  const userAlbums = useSelector(getUserPlaylists);
  const albums = useSelector(getPlaylists);
  const isAuth = useSelector(getIsAuth);

  return <>{location.pathname === '/home' ? (<PlayListListUI title="Your MuSSSiC" children={userAlbums ? userAlbums : []} locationState={{ background: location }} isAuth={isAuth}></PlayListListUI>) : (<PlayListListUI title="All MuSSSiC" children={albums ? albums : []} locationState={{ background: location }} isAuth={isAuth}></PlayListListUI>)}</>
}