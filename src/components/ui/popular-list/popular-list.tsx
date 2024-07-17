import { FC } from "react";
import styles from './popular-list.module.css';
import { TPopularList } from './type';

export const PopularListUI: FC<TPopularList> = ({ trackAutor, trackImage, trackTitle, children }) => {
  return <section className={styles.popular}>
      <div className={styles.popular_track}>
        <img className={styles.popular_track_img} src={trackImage} alt=""/>
        <div className={styles.popular_track_info}>
          <h4 className={styles.popular_track_title}>{trackTitle}</h4>
          <h5 className={styles.popular_track_autor}>{trackAutor}</h5>
        </div>
      </div>
      <ul className={styles.popular_track_list}>
        {children}
      </ul>
    </section>
};