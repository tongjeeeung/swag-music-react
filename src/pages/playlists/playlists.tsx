import { FC } from "react";
import { PlayListList } from "../../components";
import { useSelector } from "../../services/store";
import { getIsLoading } from "../../services/playlistsSlice";
import { Preloader } from "../../components/ui";

export const PlaylistsPage: FC = () => {
  const isLoadin = useSelector(getIsLoading);

  return <>{isLoadin ? (<Preloader></Preloader>) : (
    <main className='main'>
      <PlayListList></PlayListList>
    </main>
  )}</>
}