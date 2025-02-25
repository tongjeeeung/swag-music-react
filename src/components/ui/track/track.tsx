import { FC } from "react";
import styles from "./track.module.css";
import { TTrack } from "./type";
import { LikeButton, PlayButton } from "../buttons";
import { Link } from "react-router-dom";

export const TrackUI: FC<TTrack & { isPlaying: boolean }> = ({
  name,
  showPlayButtonHandler,
  showPlayButton,
  executor,
  duration,
  imgUrl,
  index,
  likeVoid,
  playVoid,
  isLike,
  isPlaying,
  id,
  executorID,
  albumName,
  albumId,
}) => {
  const wave = (
    <svg width="28" height="55" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          .base-line {
            stroke-width: 4;
            stroke: var(--accent-color);
          }
          .wave-line {
            stroke-width: 2;
            stroke: var(--accent-color);
          }
        `}
      </style>

      <line className="base-line" x1="7" y1="32" x2="21" y2="32" />

      <line className="wave-line" x1="7" y1="32" x2="7" y2="32">
        <animate
          attributeName="y2"
          values="32;50;32;10;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0s"
        />
      </line>

      <line className="wave-line" x1="8" y1="32" x2="8" y2="32">
        <animate
          attributeName="y2"
          values="32;45;32;15;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </line>

      <line className="wave-line" x1="9" y1="32" x2="9" y2="32">
        <animate
          attributeName="y2"
          values="32;42;32;12;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </line>

      <line className="wave-line" x1="10" y1="32" x2="10" y2="32">
        <animate
          attributeName="y2"
          values="32;40;32;10;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </line>

      <line className="wave-line" x1="11" y1="32" x2="11" y2="32">
        <animate
          attributeName="y2"
          values="32;38;32;12;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.8s"
        />
      </line>

      <line className="wave-line" x1="12" y1="32" x2="12" y2="32">
        <animate
          attributeName="y2"
          values="32;38;32;12;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="1s"
        />
      </line>

      <line className="wave-line" x1="13" y1="32" x2="13" y2="32">
        <animate
          attributeName="y2"
          values="32;38;32;12;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="1.2s"
        />
      </line>

      <line className="wave-line" x1="14" y1="32" x2="14" y2="32">
        <animate
          attributeName="y2"
          values="32;40;32;10;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="1.4s"
        />
      </line>

      <line className="wave-line" x1="15" y1="32" x2="15" y2="32">
        <animate
          attributeName="y2"
          values="32;42;32;12;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="1.6s"
        />
      </line>

      <line className="wave-line" x1="16" y1="32" x2="16" y2="32">
        <animate
          attributeName="y2"
          values="32;45;32;15;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="1.8s"
        />
      </line>

      <line className="wave-line" x1="17" y1="32" x2="17" y2="32">
        <animate
          attributeName="y2"
          values="32;50;32;20;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="2s"
        />
      </line>

      <line className="wave-line" x1="18" y1="32" x2="18" y2="32">
        <animate
          attributeName="y2"
          values="32;45;32;15;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="2.2s"
        />
      </line>

      <line className="wave-line" x1="19" y1="32" x2="19" y2="32">
        <animate
          attributeName="y2"
          values="32;42;32;12;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="2.4s"
        />
      </line>

      <line className="wave-line" x1="20" y1="32" x2="20" y2="32">
        <animate
          attributeName="y2"
          values="32;40;32;10;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="2.6s"
        />
      </line>

      <line className="wave-line" x1="21" y1="32" x2="21" y2="32">
        <animate
          attributeName="y2"
          values="32;37;32;7;32"
          dur="1.5s"
          repeatCount="indefinite"
          begin="2.8s"
        />
      </line>
    </svg>
  );

  return (
    <li
      className={styles.track}
      key={id}
      style={isPlaying ? { backgroundColor: "var(--menu-btn-color)" } : {}}
      onMouseOver={() => showPlayButtonHandler(true)}
      onMouseOut={() => showPlayButtonHandler(false)}
    >
      <div className={styles.track_first}>
        <div>
          {showPlayButton ? (
            <PlayButton playVoid={playVoid} isPlaying={isPlaying}></PlayButton>
          ) : isPlaying ? (
            wave
          ) : index ? (
            <h4 className={styles.index}>{index}</h4>
          ) : (
            <PlayButton playVoid={playVoid} isPlaying={isPlaying}></PlayButton>
          )}
        </div>
        {imgUrl ? <img className={styles.image} src={imgUrl}></img> : ""}
        <div className="info">
          <h5 className={styles.track_name}>{name}</h5>
          <Link
            to={`/swag-music-react/executor/${executorID}`}
            className={styles.track_executor}
          >
            {executor}
          </Link>
        </div>
      </div>
      <Link
        to={`/swag-music-react/playlists/${albumId}`}
        className={styles.album}
      >
        {albumName}
      </Link>
      <div className={styles.track_second}>
        <LikeButton likeVoid={likeVoid} isLike={isLike}></LikeButton>
        <span className={styles.track_duration}>{duration}</span>
      </div>
    </li>
  );
};
