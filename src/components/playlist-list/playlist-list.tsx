import { FC } from "react";
import { PlayListListUI } from "../ui";
import { useSelector } from "../../services/store";
import { getPlaylists, getUserPlaylists } from "../../services/playlistsSlice";
import { useLocation } from "react-router-dom";
import { getIsAuth, getUser } from "../../services/userSlice";

export const PlayListList: FC = () => {
  const location = useLocation();
  const userAlbumsSelector = useSelector(getUserPlaylists);
  const albums = useSelector(getPlaylists);
  const isAuth = useSelector(getIsAuth);
  const user = useSelector(getUser);

  const userAlbums = userAlbumsSelector?.map((album) => {
    return album;
  });

  if (userAlbums && user) {
    const likedAlbum = user.likedPlaylist;
    userAlbums.unshift(likedAlbum);
  }

  return (
    <>
      {location.pathname === "/swag-music-react/home" && user ? (
        <PlayListListUI
          title="Your MuSSSiC"
          children={userAlbums ? userAlbums : []}
          locationState={{ background: location }}
          isAuth={isAuth}
        ></PlayListListUI>
      ) : (
        <PlayListListUI
          title="All MuSSSiC"
          children={albums ? albums : []}
          locationState={{ background: location }}
          isAuth={isAuth}
        ></PlayListListUI>
      )}
    </>
  );
};
