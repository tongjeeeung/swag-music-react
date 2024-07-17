import { FC, useEffect } from "react";
import { PlayListList, PopularList, Slider } from "../../components";
import { useDispatch, useSelector } from "../../services/store";
import { getIsLoading, getUserPlaylistsThunk } from "../../services/playlistsSlice";
import { getPopularThunk, getIsLoadingPopular } from "../../services/popularSlice";
import { Preloader } from "../../components/ui";
import { getUser } from "../../services/userSlice";

export const AppMusic: FC = () => {
  const isLoadinPlaylist = useSelector(getIsLoading);
  const isLoadinPopular = useSelector(getIsLoadingPopular);
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) {
      dispatch(getUserPlaylistsThunk(user.addedPlaylists));
    }
  }, [user?.addedPlaylists])

  useEffect(() => {
    dispatch(getPopularThunk())
  }, [])

  return <>{isLoadinPlaylist || isLoadinPopular ? (<Preloader></Preloader>) : (
    <main className='main'>
      <Slider></Slider>
      <PlayListList></PlayListList>
      <PopularList></PopularList>
    </main>
  )}</>
}