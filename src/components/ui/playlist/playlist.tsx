import { FC } from "react";
import styles from './playlist.module.css';
import { TPlaylist } from './type';
import shuffleSvg from '../../../assets/svg/shuffle.svg';

export const PlaylistUI: FC<TPlaylist> = ({ name, executor, image, information, isAdd, isShuffle, children, addPlaylistHandle, shuffleHandle, isOwner, changeHandle }) => (
    <div className={styles.playlist_content}>
      <div className={styles.playlist_header}>
        <img className={styles.playlist_image} src={image} alt="" />
        <div className={styles.playlist_header_information}>
          <h2 className={styles.playlist_title}>{name}</h2>
          <h3 className={styles.playlist_executor}>{executor}</h3>
          <p className={styles.playlist_header_information_about}>{information}</p>
        </div>
        {isOwner ? (<button className={styles.playlist_button_add} onClick={changeHandle}>Edit</button>) : (<button className={styles.playlist_button_add} onClick={addPlaylistHandle}>{isAdd ? 'remove' : 'add'}</button>)}
      </div>
      <button className={styles.playlist_shuffle_button} onClick={shuffleHandle}>
        <svg className={isShuffle ? (styles.playlist_shuffle_svg + ` ${styles.playlist_shuffle_active}`) : styles.playlist_shuffle_svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use href={shuffleSvg + "#shuffle"}></use>
        </svg>
        Shuffle</button>
      <ul className={styles.playlist_list}>
        {children}
      </ul>
    </div>
)