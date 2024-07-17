import { FC, MouseEventHandler } from "react";
import styles from './play-button.module.css';
import playSvg from '../../../../../public/static/svg/play.svg'
import pauseSvg from '../../../../../public/static/svg/pause.svg'

export const PlayButton: FC<{playVoid: MouseEventHandler, isPlaying: boolean}> = ({ playVoid, isPlaying }) => {
  return <>
  {isPlaying ? (<button className={styles.play_button} onClick={playVoid}>
    <svg className={styles.play_svg && styles.active} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <use href={pauseSvg + "#pause"}></use>
    </svg>
  </button>) : (<button className={styles.play_button} onClick={playVoid}>
    <svg className={styles.play_svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <use href={playSvg + "#play"}></use>
    </svg>
  </button>)}</>}
