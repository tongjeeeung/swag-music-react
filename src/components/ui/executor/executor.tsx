import { FC, useState } from "react";
import { ExecutorUIProps } from "./type";
import styles from "./executor.module.css";
import { PlaylistItemUI } from "../playlist-item";
import { Track } from "../../track";
import { Link, useLocation } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const ExecutorUI: FC<ExecutorUIProps> = ({
  executor,
  playlists,
  tracks,
  executors,
  listenHandle,
}) => {
  const location = useLocation();
  const [moreIndex, setIndex] = useState<number>(4);
  const [parent] = useAutoAnimate();

  const handleMore = () => {
    if (tracks.length >= moreIndex) {
      if (tracks.length - moreIndex > 5) {
        setIndex(moreIndex + 5);
      } else {
        setIndex(tracks.length - 1);
      }
    }
  };

  return (
    <div className={styles.executor}>
      <div className={styles.logo}>
        <img className={styles.img} src={executor.image} alt={executor.name} />
        <div className={styles.info}>
          <h2 className={styles.name}>{executor.name}</h2>
          <p
            className={styles.title}
          >{`${executor.allAuditions ? executor.allAuditions : "0"} listenings.`}</p>
          <button className={styles.button} onClick={listenHandle}>
            Listen
          </button>
        </div>
      </div>
      <div className={styles.tracks}>
        <h3 className={styles.section_name}>Tracks</h3>
        <ul className={styles.tracks_list} ref={parent}>
          {tracks.map((track, index) => {
            if (index <= moreIndex) {
              return (
                <Track
                  name={track.name}
                  executor={track.executor}
                  duration={track.duration}
                  _id={track._id}
                  executorID={executor._id}
                  playlistID={track.albumId}
                  index={0}
                  imgUrl={track.image}
                  albumName={track.albumName}
                ></Track>
              );
            }
          })}
        </ul>
        {moreIndex < tracks.length - 1 ? (
          <button className={styles.more} onClick={handleMore}>
            See more
          </button>
        ) : (
          ""
        )}
      </div>
      <div className={styles.playlists}>
        <h3 className={styles.section_name}>Playlists</h3>
        <ul className={styles.list}>
          {playlists.map((playlist) => {
            return (
              <Link
                to={`/swag-music-react/playlists/${playlist._id}`}
                state={{ background: location }}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <PlaylistItemUI
                  name={playlist.name}
                  executor={playlist.executor}
                  image={
                    typeof playlist.image === "string" ? playlist.image : ""
                  }
                  id={playlist._id}
                  executorId={playlist.executorID ? playlist.executorID : ""}
                ></PlaylistItemUI>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className={styles.other}>
        <h3 className={styles.section_name}>Other executors</h3>
        <ul className={styles.list}>
          {executors.map((_executor) => {
            if (_executor.name !== executor.name)
              return (
                <Link
                  to={`/swag-music-react/executor/${_executor._id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <li className={styles.item} key={_executor._id}>
                    <img
                      className={styles.other_image}
                      src={_executor.image}
                      alt={_executor.name}
                    />
                    <h4 className={styles.other_name}>{_executor.name}</h4>
                    <span className={styles.other_subtitle}>executor</span>
                  </li>
                </Link>
              );
          })}
        </ul>
      </div>
    </div>
  );
};
