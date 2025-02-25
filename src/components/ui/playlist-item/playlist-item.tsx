import { FC } from "react";
import styles from "./playlist-item.module.css";
import { TPlaylistItem } from "./type";
import { Link } from "react-router-dom";

export const PlaylistItemUI: FC<TPlaylistItem> = ({
  executor,
  name,
  image,
  id,
  executorId,
}) => (
  <li className={styles.playlist_item} key={id}>
    <Link
      to={`/swag-music-react/playlists/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <img
        className={styles.playlist_item_image}
        src={image}
        alt={name && executor}
      />
      <h2 className={styles.playlist_item_title}>{name}</h2>
    </Link>
    <Link
      to={`/swag-music-react/executor/${executorId}`}
      style={{ textDecoration: "none", color: "inherit" }}
      className={styles.playlist_item_executor}
    >
      <h3 className={styles.playlist_item_executor}>{executor}</h3>
    </Link>
  </li>
);
