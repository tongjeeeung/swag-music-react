import { FC, useEffect, useState } from "react";
import { ControlerUI } from "../ui";
import { useDispatch, useSelector } from "../../services/store";
import { getPlaylistByIdForCurrentThunk, getState, postCurrentTrackThunk, setVolume, toggleLikeTrack, togglePlaying, toggleRepeat, toggleShuffle, volumeMute } from "../../services/currentSlice";
import { TPlaylist } from "../../utils/types";
import { getUser, toggleLikeTrackThunk } from "../../services/userSlice";
import { useNavigate } from "react-router-dom";

export const Controler: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const current = useSelector(getState).current;
  const controler = useSelector(getState);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [time, setTime] = useState<string>('0:00');
  const [currentAlbum, setCurrentAlbum] = useState<TPlaylist>(controler.currentPlaylist);
  const volume = controler.volume;
  const openControler = current._id !== '' ? true : false;

  function audioTime(duration: number) {
    const minutes = Math.floor(duration / 60);
    const seconds = (Math.floor(duration - minutes * 60)) < 10 ? `0${Math.floor(duration - minutes * 60)}` : Math.floor(duration - minutes * 60);
  
    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    // Останавливаем текущий аудио элемент, если он существует
    if (audio) {
      audio.pause();
    }

    // Создаем новый аудио элемент
    const newAudio = new Audio(current.url);
    setAudio(newAudio);

    if (user) {
      const like = user.likedTracks.find((id) => id === current._id) ? true : false;
      if (like && !current.isLike) {
        dispatch(toggleLikeTrack());
      }
    }

    // Очищаем аудио элемент при размонтировании компонента или смене current._id
    return () => {
      newAudio.pause();
      newAudio.src = '';
    };
  }, [current._id]);

  useEffect(() => {
    setCurrentAlbum(controler.currentPlaylist);
  }, [controler.currentPlaylist._id])

  useEffect(() => {
    if (audio && controler.playing) {
      setTimeout(() => { setTime(audioTime(audio.currentTime)) }, 1000);
    }
  }, [audio?.currentTime]);

  useEffect(() => {
    if (audio) {
      if (controler.playing) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [controler.playing, audio]);

  const likeHandle = () => {
    if (user) {
      dispatch(toggleLikeTrackThunk(current._id));
      dispatch(toggleLikeTrack())
    }
    else {
      navigate('/login');
    }
  }

  const prevHandle = () => {
    const prev = currentAlbum?.tracks[currentAlbum?.tracks.findIndex((track) => track._id === current._id) - 1];
    const last = currentAlbum?.tracks[currentAlbum.tracks.length - 1];

    const itemId = prev?._id || last?._id;

    if(!itemId) return;

    dispatch(postCurrentTrackThunk(itemId))
    dispatch(getPlaylistByIdForCurrentThunk(currentAlbum._id))
  } //предыдущая песня

  const nextHandle = () => {
    if (controler.shuffle) {
      shuffleNextHandle();
    }
    else {
      const next = currentAlbum?.tracks[currentAlbum?.tracks.findIndex((track) => track._id === current._id) + 1];
      const first = currentAlbum?.tracks[0];

      const itemId = next?._id || first?._id;

      if(!itemId) return;

      dispatch(postCurrentTrackThunk(itemId))
      dispatch(getPlaylistByIdForCurrentThunk(currentAlbum._id))
    }
  } //следующая песня

  const progressHandle = (evt: number) => {
    const progressWidth = window.getComputedStyle(document.querySelector('#range')!).width.replace(/[a-z%]/gi, '');
    const width = evt / Number(progressWidth) * 100;
    audio!.currentTime = width * audio!.duration / 100;
    setTime(audioTime(width * audio!.duration / 100));
  } //перемотка трека

  const volumeHandle = (evt: number) => {
    dispatch(setVolume(evt))
  } //громкость

  const volumeMuteHandle = () => {
    dispatch(volumeMute());
  } //мут

  const repeatHandle = () => {
    dispatch(toggleRepeat());
  }

  const shuffleHandle = () => {
    dispatch(toggleShuffle());
  }

  const shuffleNextHandle = () => {
    const rand: number = Number(Math.random().toFixed(1))*10;
    const randIndex = Math.abs(currentAlbum!.tracks.length - 1 - rand);
    
    if (current._id === currentAlbum!.tracks[randIndex]._id) {
      dispatch(postCurrentTrackThunk(currentAlbum!.tracks[randIndex + 1]._id))
      dispatch(getPlaylistByIdForCurrentThunk(currentAlbum._id))
    }
    else {
      dispatch(postCurrentTrackThunk(currentAlbum!.tracks[randIndex]._id))
      dispatch(getPlaylistByIdForCurrentThunk(currentAlbum._id))
    }
  } //переключение на рандомную песню из альбома

  const playHandle = () => {
    dispatch(togglePlaying())
  } //изменение стейта (пауза или плей)

  if (audio) {
    if(Math.floor(audio.currentTime) === Math.floor(audio.duration)) {
      if(!controler.repeating) {
        nextHandle();
      }
      audio.currentTime = 0;
    }
    audio.volume = volume;
  } //окончание трека, переключения на рандомный или следующий

  return (
    <ControlerUI name={current.name} executorID={current.executorID} executor={current.executor} image={current.image} duration={current.duration} open={openControler} trackTimer={time} isLike={current.isLike} isPlaying={controler.playing} isRepeat={controler.repeating} isShuffle={controler.shuffle} progressVoid={progressHandle} volumeVoid={volumeHandle} volumeButtonVoid={volumeMuteHandle} volumeWidth={volume} likeVoid={likeHandle} nextVoid={nextHandle} playVoid={playHandle} prevVoid={prevHandle} repeatVoid={repeatHandle} shuffleVoid={shuffleHandle}></ControlerUI>
  )
}