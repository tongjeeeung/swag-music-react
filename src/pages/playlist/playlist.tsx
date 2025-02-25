import { FC, useEffect } from "react";
import { Playlist } from "../../components/playlist/playlist";
import { useSelector } from "../../services/store";
import { getIsLoading } from "../../services/playlistsSlice";
import { Preloader } from "../../components/ui";

export const PlaylistPage: FC = () => {
  const isLoadin = useSelector(getIsLoading);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {isLoadin ? (
        <Preloader></Preloader>
      ) : (
        <main className="main">
          <Playlist />
        </main>
      )}
    </>
  );
};
