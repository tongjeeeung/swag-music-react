import { FC } from "react";
import styles from './playlist-list.module.css';
import { TPlayListList } from './type';
import { PlaylistItemUI } from "../playlist-item";
import { Link } from "react-router-dom";

export const PlayListListUI: FC<TPlayListList> = ({ title, children, locationState, isAuth }) => (
  <section className={styles.playlists}>
    <h2 className={styles.playlists_title}>{title}</h2>
    {isAuth ? (<Link to={'/playlists/create/new-playlist'} state={locationState} className={styles.plus}>+</Link>) : ('')}
    <ul className={styles.playlist_list}>
      {children.length > 0 ? (children.map((item) => (
      <Link to={`/playlists/${item._id}`} key={item._id} state={locationState} style={{ textDecoration: 'none', color: "inherit" }}>
        <PlaylistItemUI name={item.name} executor={item.executor} image={typeof item.image === 'string' ? item.image : ''} key={item._id} id={item._id}></PlaylistItemUI>
      </Link>
      ))) : (<h2 className={styles.playlists_nothing}>No added albums</h2>)}
    </ul>
  </section>
)