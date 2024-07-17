import { FC } from "react";
import styles from './playlist-item.module.css';
import { TPlaylistItem } from './type';

export const PlaylistItemUI: FC<TPlaylistItem> = ({ executor, name, image, id }) => (
  <li className={styles.playlist_item} key={id}>
    <img className={styles.playlist_item_image} src={image} alt={name && executor}/>
    <h2 className={styles.playlist_item_title}>{name}</h2>
    <h3 className={styles.playlist_item_executor}>{executor}</h3>
  </li>
)