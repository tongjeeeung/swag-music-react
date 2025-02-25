import { FC, useEffect } from "react";
import { PlayListList } from "../../components";
import { useSelector } from "../../services/store";
import { getIsLoading } from "../../services/playlistsSlice";
import { Preloader } from "../../components/ui";

export const PlaylistsPage: FC = () => {
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
          <PlayListList></PlayListList>
        </main>
      )}
    </>
  );
};
