import { FC } from "react";
import { PopularListUI } from "../ui";
import { useSelector } from "../../services/store";
import { getState } from "../../services/currentSlice";
import { Track } from "../track";
import { getPopular } from "../../services/popularSlice";

export const PopularList: FC = () => {
  const tracks = useSelector(getPopular);
  const current = useSelector(getState);

  if (tracks.length > 0) {
    return <>
      <PopularListUI trackAutor={current.current.executor ? (current.current.executor) : (tracks[0].executor)} trackImage={current.current.image ? (current.current.image) : (tracks[0].image)} trackTitle={current.current.name ? (current.current.name) : (tracks[0].name)}>
        {tracks.length > 0 ? (tracks.map((item) => (<Track name={item.name} executor={item.executor} duration={item.duration} _id={item._id} key={item._id} executorID={item.executorID} playlistID={item.albumId}></Track>))) : (<></>)}
      </PopularListUI></>
  }

  return null
}