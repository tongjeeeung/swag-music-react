import { FC } from "react";
import styles from './playlist.module.css';
import { TPlaylist } from './type';
//import shuffleSvg from '../../../assets/svg/shuffle.svg';

export const PlaylistUI: FC<TPlaylist> = ({ name, executor, image, information, isAdd, isShuffle, children, addPlaylistHandle, shuffleHandle, isOwner, changeHandle }) => (
    <div className={styles.playlist_content}>
      <div className={styles.playlist_header}>
        <img className={styles.playlist_image} src={typeof image === 'string' ? image : ''} alt="" />
        <div className={styles.playlist_header_information}>
          <h2 className={styles.playlist_title}>{name}</h2>
          <h3 className={styles.playlist_executor}>{executor}</h3>
          <p className={styles.playlist_header_information_about}>{information}</p>
        </div>
        {isOwner ? (<button className={styles.playlist_button_add} onClick={changeHandle}>Edit</button>) : (<button className={styles.playlist_button_add} onClick={addPlaylistHandle}>{isAdd ? 'remove' : 'add'}</button>)}
      </div>
      <button className={styles.playlist_shuffle_button} onClick={shuffleHandle}>
        <svg className={isShuffle ? (styles.playlist_shuffle_svg + ` ${styles.playlist_shuffle_active}`) : styles.playlist_shuffle_svg} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M21.924 6.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L18.586 6h-3.321a5 5 0 0 0-4.288 2.428l-3.67 6.115A3 3 0 0 1 4.736 16H3a1 1 0 1 0 0 2h1.735a5 5 0 0 0 4.288-2.428l3.67-6.115A3 3 0 0 1 15.264 8h3.32l-1.292 1.293a1 1 0 0 0 1.414 1.414l3-3A.997.997 0 0 0 22 7m-.076-.383a.996.996 0 0 1 .076.38l-.076-.38z"/>
          <path fill="currentColor" d="M21.706 17.708l-2.999 3a1 1 0 0 1-1.414-1.415L18.586 18h-3.321a5 5 0 0 1-4.288-2.428l-3.67-6.115A3 3 0 0 0 4.736 8H3a1 1 0 0 1 0-2h1.735a5 5 0 0 1 4.288 2.428l3.67 6.115A3 3 0 0 0 15.264 16h3.32l-1.292-1.293a1 1 0 0 1 1.414-1.414l3 3c.195.194.292.45.293.704V17a.997.997 0 0 1-.294.708z"/>
        </svg>
        Shuffle</button>
      <ul className={styles.playlist_list}>
        {children}
      </ul>
    </div>
)