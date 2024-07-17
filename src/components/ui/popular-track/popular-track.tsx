import { FC } from "react";
import styles from './popular-track.module.css';
import { TPopularTrack } from './type';
import { LikeButton, PlayButton } from "../buttons";

export const PopularTrackUI: FC<TPopularTrack> = ({ executor, name, duration, likeVoid, playVoid }) => (
  <li className={styles.popular_item}>
    <div className={styles.popular_track_first}>
      <PlayButton playVoid={playVoid} isPlaying={false}></PlayButton>
      <h4 className={styles.popular_executor}>{executor}</h4>
      <span>-</span>
      <h5 className={styles.popular_name}>{name}</h5>
    </div>
    <div className={styles.popular_track_second}>
      <LikeButton likeVoid={likeVoid} isLike={false}></LikeButton>
      <span className={styles.popular_duration}>{duration}</span>
    </div>
  </li>
)