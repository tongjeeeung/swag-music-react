import { getPlaylistByIdForCurrentThunk, postCurrentTrackThunk, truePlaying } from "../../services/currentSlice";
import { getExecutors } from "../../services/executorSlice";
import { getPopularPlaylists } from "../../services/popularSlice";
import { useDispatch, useSelector } from "../../services/store";
import { TPlaylist } from "../../utils/types";
import { Preloader, SliderUI } from "../ui";
import { FC } from "react";

export const Slider: FC = () => {
  let position = 100;
  let flag = true;
  const allExecutors = useSelector(getExecutors);
  const popularPlaylists = useSelector(getPopularPlaylists);
  const items: TPlaylist[] = []
  const dispatch = useDispatch();

  popularPlaylists.map((popularPlaylist) => {
    allExecutors.map((executor) => {
      executor.playlists.map((playlist) => {
        if (playlist._id === popularPlaylist._id) {
          const _playlist = {
            ...playlist,
            executorID: executor._id,
            executorImg: executor.image
          }
          items.push(_playlist)
        }
      })
    })
  })

  const listenHandle = (playlist: TPlaylist) => {
    const randId = playlist.tracks[Math.floor(Math.random() * playlist.tracks.length)]._id
    dispatch(postCurrentTrackThunk(randId))
    dispatch(getPlaylistByIdForCurrentThunk(playlist._id))
    dispatch(truePlaying())
  }

  function sliderHandle(ref: HTMLUListElement) {
    if(position < 100 * 2 && flag) {
      position += 100;
      flag = false;
    }
    else if(position > 0) {
      position -= 100;
    }
    else {
      position += 100;
      flag = true;
    }
    if (ref !== null) {
      ref.style.left = -position + 'vw';
    }
  }

  return <>{items.length > 0 ? (<SliderUI sliderVoid={sliderHandle} items={items} listenHandle={listenHandle}></SliderUI>) : (<Preloader></Preloader>)}</>
}