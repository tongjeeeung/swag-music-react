import { FC, useRef } from "react";
import styles from './controler.module.css';
import { LikeButton, PlayButton } from "../buttons";
import clsx from "clsx";

import shuffleSvg from '../../../../public/static/svg/shuffle.svg'
import nextSvg from '../../../../public/static/svg/next.svg';
import repeatSvg from '../../../../public/static/svg/repeat.svg';
import volumeSvg from '../../../../public/static/svg/volume.svg';
import volumeSvgMin from '../../../../public/static/svg/volume_min.svg';
import volumeSvgMute from '../../../../public/static/svg/mute.svg';
import { TControler } from "./type";
import { Link } from "react-router-dom";

export const ControlerUI: FC<TControler & {open: boolean}> = ({likeVoid, image, name, executorID, executor, open, trackTimer, isLike, isPlaying, isShuffle, shuffleVoid, progressVoid, volumeButtonVoid, prevVoid, nextVoid, playVoid, isRepeat, repeatVoid, volumeVoid, volumeWidth, duration}) => {
  let volumeSvg2 = volumeSvg;

  const timeWidth = (Number(trackTimer.split(':')[0]) * 60 + Number(trackTimer.split(':')[1])) * 100 / (Number(duration.split(':')[0]) * 60 + Number(duration.split(':')[1]));
  if (volumeWidth >= 0.5) {
    volumeSvg2 = volumeSvg;
  }
  else if (volumeWidth === 0) {
    volumeSvg2 = volumeSvgMute;
  }
  else {
    volumeSvg2 = volumeSvgMin;
  }

  let lastScroll = 0;
  const controler: null | {current: HTMLDivElement | null} = useRef(null);

  if (controler.current !== null && open) {
    const containHide = () => controler.current!.classList.contains(`${styles.open}`);
    const scrollPosition = () => window.pageXOffset || document.documentElement.scrollTop;
    
    const defaultoffset = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight,
      document.documentElement.scrollTop
    ) - 500;
    
    window.addEventListener('scroll', () => {
      if(scrollPosition() > lastScroll && containHide() && scrollPosition() > defaultoffset){
        controler.current!.classList.remove(`${styles.open}`);
      }
      else if(scrollPosition() < lastScroll && !containHide() && scrollPosition() > defaultoffset){
        controler.current!.classList.add(`${styles.open}`);
      }
  
      lastScroll = scrollPosition();
    })
  }

  return (
  <div className={styles.controler + clsx(open ? ` ${styles.open}` : '')} ref={controler}>
    <div className={styles.current}>
      <img className={styles.image} src={image} />
      <div className={styles.info}>
        <h4 className={styles.title}>{name}</h4>
        <Link to={`/executor/${executorID}`} className={styles.executor}>{executor}</Link>
      </div>
      <LikeButton likeVoid={likeVoid} isLike={isLike}/>
    </div>
    <div className={styles.menu}>
      <button className={styles.menu_button} onClick={shuffleVoid}>
        <svg className={clsx(styles.svg, {[styles.active]: isShuffle})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use href={shuffleSvg + "#shuffle"}></use>
        </svg>
      </button>
      <button className={styles.menu_button} onClick={prevVoid}>
        <svg className={clsx(styles.svg + ' ' + styles.prevButton)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use href={nextSvg + "#next"}></use>
        </svg>
      </button>
      <div className={styles.circle}>
        <PlayButton playVoid={playVoid} isPlaying={isPlaying} />
      </div>
      <button className={styles.menu_button} onClick={nextVoid}>
        <svg className={clsx(styles.svg)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use href={nextSvg + "#next"}></use>
        </svg>
      </button>
      <button className={styles.menu_button} onClick={repeatVoid}>
        <svg className={clsx(styles.svg, {[styles.active]: isRepeat})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use href={repeatSvg + "#repeat"}></use>
        </svg>
      </button>
    </div>
    <div className={styles.volume_menu}>
      <button className={styles.menu_button} onClick={volumeButtonVoid}>
        <svg className={clsx(styles.svg)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use href={volumeSvg2 + "#volume"}></use>
        </svg>
      </button>
      <div className={styles.volume_range}>
        <div style={{width: `${volumeWidth*100}px`}} className={styles.value}></div>
        <div className={styles.input} id="volume" onClick={(evt) => volumeVoid(evt.nativeEvent.layerX/100)}></div>
      </div>
    </div>
    <div className={styles.controler_range}>
      <span className={styles.start}>{trackTimer}</span>
      <div className={styles.progress}>
        <div style={{width: `${timeWidth}%`}} className={styles.full_range}></div>
        <div className={styles.range_input} onClick={(evt) => progressVoid(evt.nativeEvent.layerX)} id="range"></div>
      </div>
      <span className={styles.end}>{duration}</span>
    </div>
  </div>
)}