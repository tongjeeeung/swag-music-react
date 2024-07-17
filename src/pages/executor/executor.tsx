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
    dispatch(getArtistThunk(`${executorID.id}`))
  }, [executorID.id])

  return <main className="main">{isLoading ? (<Preloader></Preloader>) : (
    <Executor></Executor>
  )}</main>
}