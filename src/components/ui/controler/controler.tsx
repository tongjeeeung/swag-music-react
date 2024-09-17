import { FC, useRef } from "react";
import styles from './controler.module.css';
import { LikeButton, PlayButton } from "../buttons";
import clsx from "clsx";

//import shuffleSvg from '../../../../public/static/svg/shuffle.svg'
//import nextSvg from '../../../../public/static/svg/next.svg';
//import repeatSvg from '../../../../public/static/svg/repeat.svg';
//import volumeSvg from '../../../../public/static/svg/volume.svg';
//import volumeSvgMin from '../../../../public/static/svg/volume_min.svg';
//import volumeSvgMute from '../../../../public/static/svg/volume_mute.svg';
import { TControler } from "./type";
import { Link } from "react-router-dom";

export const ControlerUI: FC<TControler & {open: boolean}> = ({likeVoid, image, name, executorID, executor, open, trackTimer, isLike, isPlaying, isShuffle, shuffleVoid, progressVoid, volumeButtonVoid, prevVoid, nextVoid, playVoid, isRepeat, repeatVoid, volumeVoid, volumeWidth, duration}) => {
  let volumeSvg2 = <>(<path d="M1,22v3c0,0.343.007,0.829,0,1a0.556,0.556,0,0,0,0,.057A1.377,1.377,0,0,0,2,27H5l2,2,1,1H9V18H8L5,21a25.547,25.547,0,0,1-3,0,0.7,0.7,0,0,0-.227,0A1.318,1.318,0,0,0,1,22Z" transform="translate(4 -11)"/>
    <path d="M10.226,21a0.752,0.752,0,0,1,0-1,1.09,1.09,0,0,1,.966.3c1.757,1.381.469,5.492-.1,6.807a1.076,1.076,0,0,1-.553.754A1.063,1.063,0,0,1,10.226,27c-0.077-1.227.838-1.939,1-3a3.621,3.621,0,0,0-.963-2.967C10.255,21.027,10.239,21.013,10.226,21Z" transform="translate(4 -11)"/>)</>;

  const timeWidth = (Number(trackTimer.split(':')[0]) * 60 + Number(trackTimer.split(':')[1])) * 100 / (Number(duration.split(':')[0]) * 60 + Number(duration.split(':')[1]));
  if (volumeWidth >= 0.5) {
    volumeSvg2 = <>(<path d="M1,22v3c0,0.343.007,0.829,0,1a0.556,0.556,0,0,0,0,.057A1.377,1.377,0,0,0,2,27H5l2,2,1,1H9V18H8L5,21a25.547,25.547,0,0,1-3,0,0.7,0.7,0,0,0-.227,0A1.318,1.318,0,0,0,1,22Z" transform="translate(4 -11)"/>
      <path d="M10.226,21a0.752,0.752,0,0,1,0-1,1.09,1.09,0,0,1,.966.3c1.757,1.381.469,5.492-.1,6.807a1.076,1.076,0,0,1-.553.754A1.063,1.063,0,0,1,10.226,27c-0.077-1.227.838-1.939,1-3a3.621,3.621,0,0,0-.963-2.967C10.255,21.027,10.239,21.013,10.226,21Z" transform="translate(4 -11)"/>
      <path d="M13.3,19.537a1.088,1.088,0,0,1,0-1.446c0.409-.273,1.179.269,1.4,0.441,2.542,2,.678,7.943-0.145,9.844a1.556,1.556,0,0,1-.8,1.09,1.538,1.538,0,0,1-.453-1.251c-0.112-1.775,1.213-2.8,1.446-4.339a5.236,5.236,0,0,0-1.392-4.291C13.345,19.575,13.321,19.555,13.3,19.537Z" transform="translate(4 -11)"/>)</>;
  }
  else if (volumeWidth === 0) {
    volumeSvg2 = <>
    <path d="M1,22v3c0,0.343.007,0.829,0,1a0.556,0.556,0,0,0,0,.057A1.377,1.377,0,0,0,2,27H5l2,2,1,1H9V18H8L5,21a25.547,25.547,0,0,1-3,0,0.7,0.7,0,0,0-.227,0A1.318,1.318,0,0,0,1,22Z" transform="translate(4 -11)"/>
    <path d="M1,18l1-1L15,30l-1,1Z" transform="translate(4 -11)"/>
    </>;
  }
  else {
    volumeSvg2 = <>
      <path d="M1,22v3c0,0.343.007,0.829,0,1a0.556,0.556,0,0,0,0,.057A1.377,1.377,0,0,0,2,27H5l2,2,1,1H9V18H8L5,21a25.547,25.547,0,0,1-3,0,0.7,0.7,0,0,0-.227,0A1.318,1.318,0,0,0,1,22Z" transform="translate(4 -11)"/>
      <path d="M10.226,21a0.752,0.752,0,0,1,0-1,1.09,1.09,0,0,1,.966.3c1.757,1.381.469,5.492-.1,6.807a1.076,1.076,0,0,1-.553.754A1.063,1.063,0,0,1,10.226,27c-0.077-1.227.838-1.939,1-3a3.621,3.621,0,0,0-.963-2.967C10.255,21.027,10.239,21.013,10.226,21Z" transform="translate(4 -11)"/>
    </>;
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
        <Link to={`/swag-music-react/executor/${executorID}`} className={styles.executor}>{executor}</Link>
      </div>
      <LikeButton likeVoid={likeVoid} isLike={isLike}/>
    </div>
    <div className={styles.menu}>
      <button className={styles.menu_button} onClick={shuffleVoid}>
        <svg className={clsx(styles.svg, {[styles.active]: isShuffle})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.924 6.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L18.586 6h-3.321a5 5 0 0 0-4.288 2.428l-3.67 6.115A3 3 0 0 1 4.736 16H3a1 1 0 1 0 0 2h1.735a5 5 0 0 0 4.288-2.428l3.67-6.115A3 3 0 0 1 15.264 8h3.32l-1.292 1.293a1 1 0 0 0 1.414 1.414l3-3A.997.997 0 0 0 22 7m-.076-.383a.996.996 0 0 1 .076.38l-.076-.38z"/>
          <path d="M21.706 17.708l-2.999 3a1 1 0 0 1-1.414-1.415L18.586 18h-3.321a5 5 0 0 1-4.288-2.428l-3.67-6.115A3 3 0 0 0 4.736 8H3a1 1 0 0 1 0-2h1.735a5 5 0 0 1 4.288 2.428l3.67 6.115A3 3 0 0 0 15.264 16h3.32l-1.292-1.293a1 1 0 0 1 1.414-1.414l3 3c.195.194.292.45.293.704V17a.997.997 0 0 1-.294.708z"/>
        </svg>
      </button>
      <button className={styles.menu_button} onClick={prevVoid}>
        <svg className={clsx(styles.svg + ' ' + styles.prevButton)} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 4C21 3.44772 20.5523 3 20 3C19.4477 3 19 3.44772 19 4V20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20V4Z" fill="currentColor"></path>
          <path d="M3 4.94743C3 3.5226 4.61175 2.69498 5.7697 3.52521L16.2394 11.0318C17.2443 11.7523 17.2053 13.2593 16.1646 13.927L5.69492 20.6434C4.53019 21.3905 3 20.5542 3 19.1704V4.94743Z" fill="currentColor"></path>
        </svg>
      </button>
      <div className={styles.circle}>
        <PlayButton playVoid={playVoid} isPlaying={isPlaying} />
      </div>
      <button className={styles.menu_button} onClick={nextVoid}>
        <svg className={clsx(styles.svg)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 4C21 3.44772 20.5523 3 20 3C19.4477 3 19 3.44772 19 4V20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20V4Z" fill="currentColor"></path>
          <path d="M3 4.94743C3 3.5226 4.61175 2.69498 5.7697 3.52521L16.2394 11.0318C17.2443 11.7523 17.2053 13.2593 16.1646 13.927L5.69492 20.6434C4.53019 21.3905 3 20.5542 3 19.1704V4.94743Z" fill="currentColor"></path>
        </svg>
      </button>
      <button className={styles.menu_button} onClick={repeatVoid}>
        <svg className={clsx(styles.svg, {[styles.active]: isRepeat})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.924 5.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L17.586 5H8a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0v-2a3 3 0 0 1 3-3h9.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3A.997.997 0 0 0 21 6m-.076-.383a.996.996 0 0 1 .076.38l-.076-.38zm-17.848 12a.997.997 0 0 0 .217 1.09l3 3a1 1 0 0 0 1.414-1.414L6.414 19H16a5 5 0 0 0 5-5v-2a1 1 0 1 0-2 0v2a3 3 0 0 1-3 3H6.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3m-.217.324a.997.997 0 0 1 .215-.322l-.215.322z"/>
        </svg>
      </button>
    </div>
    <div className={styles.volume_menu}>
      <button className={styles.menu_button} onClick={volumeButtonVoid}>
        <svg className={clsx(styles.svg)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {volumeSvg2}
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