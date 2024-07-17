import { FC } from "react";
import styles from './track.module.css';
import { TTrack } from "./type";
import { LikeButton, PlayButton } from "../buttons";
import { Link } from "react-router-dom";

export const TrackUI: FC<TTrack & {isPlaying: boolean}> = ({name, executor, duration, likeVoid, playVoid, isLike, isPlaying, id, executorID}) => (
  <li className={styles.track} key={id} style={isPlaying ? {backgroundColor: 'var(--menu-btn-color)'} : {}}>
    <div className={styles.track_first}>
      <PlayButton playVoid={playVoid} isPlaying={isPlaying}></PlayButton>
      <Link to={`/executor/${executorID}`} className={styles.track_executor}>{executor}</Link>
      <span>-</span>
      <h5 className={styles.track_name}>{name}</h5>
    </div>
    <div className={styles.track_second}>
      <LikeButton likeVoid={likeVoid} isLike={isLike}></LikeButton>
      <span className={styles.track_duration}>{duration}</span>
    </div>
  </li>
)