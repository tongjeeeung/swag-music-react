import { FC, MouseEventHandler } from "react";
import styles from './play-button.module.css';
//import playSvg from '../../../../../public/static/svg/play.svg'
//import pauseSvg from '../../../../../public/static/svg/pause.svg'

export const PlayButton: FC<{playVoid: MouseEventHandler, isPlaying: boolean}> = ({ playVoid, isPlaying }) => {
  return <>
  {isPlaying ? (<button className={styles.play_button} onClick={playVoid}>
    <svg className={styles.play_svg && styles.active} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7C9 6.44772 8.55228 6 8 6C7.44772 6 7 6.44772 7 7V17C7 17.5523 7.44772 18 8 18C8.55228 18 9 17.5523 9 17V7ZM17 7C17 6.44772 16.5523 6 16 6C15.4477 6 15 6.44772 15 7V17C15 17.5523 15.4477 18 16 18C16.5523 18 17 17.5523 17 17V7Z" fill="currentColor"/>
    </svg>
  </button>) : (<button className={styles.play_button} onClick={playVoid}>
    <svg className={styles.play_svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
    </svg>
  </button>)}</>}
