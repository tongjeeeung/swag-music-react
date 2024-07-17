import { FC, useEffect, useRef } from 'react';
import styles from './slider.module.css';
import { TPlaylist } from '../../../utils/types';
import { Link, useLocation } from 'react-router-dom';

export const SliderUI: FC<{sliderVoid (arg: HTMLUListElement): void, items: TPlaylist[], listenHandle(playlist: TPlaylist): void}> = ({sliderVoid, items, listenHandle}) => {
  const sliderRef = useRef<HTMLUListElement>(null);
  const location = useLocation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSliderInterval = () => {
    if (sliderRef.current !== null) {
      intervalRef.current = setInterval(() => {
        sliderVoid(sliderRef.current!);
      }, 5000);
    }
  };

  const stopSliderInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startSliderInterval();
    return () => stopSliderInterval(); // Очищаем интервал при размонтировании компонента
  }, []);

  return (
    <section className={styles.slider}>
      <ul
        className={styles.slider_list}
        ref={sliderRef}
        onMouseEnter={stopSliderInterval}
        onMouseLeave={startSliderInterval}
      >
        {items.map((playlist: TPlaylist) => (
          <li className={styles.list_item} key={playlist._id}>
            <img className={styles.list_bg_img} src={playlist.executorImg} alt={playlist.executor} />
            <div className={styles.list_info}>
              <Link to={`/executor/${playlist.executorID}`} className={styles.slider_title}>
                {`This is ${playlist.executor}`}
              </Link>
              <p className={styles.info}>{playlist.information}</p>
              <button className={styles.slider_button} onClick={() => listenHandle(playlist)}>Listen</button>
            </div>
            <div className={styles.position}>
              <Link to={`/playlists/${playlist._id}`} state={{ background: location }} className={styles.album} style={{ color: "inherit", textDecoration: 'none' }}>
                <img className={styles.album_img} src={typeof playlist.image === 'string' ? playlist.image : ''} alt={playlist.name} />
                <div className={styles.album_info}>
                  <h4 className={styles.album_name}>{playlist.name}</h4>
                  <h5 className={styles.album_executor}>{playlist.executor}</h5>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};