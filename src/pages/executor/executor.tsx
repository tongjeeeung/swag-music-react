import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { getArtistThunk, getIsLoading } from "../../services/executorSlice";
import { Preloader } from "../../components/ui";
import { Executor } from "../../components";
import { useParams } from "react-router-dom";

export const ExecutorPage: FC = () => {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const executorID = useParams();

  useEffect(() => {
    dispatch(getArtistThunk(`${executorID.id}`));

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [executorID.id]);

  return (
    <main className="main">
      {isLoading ? <Preloader></Preloader> : <Executor></Executor>}
    </main>
  );
};
