import { FC } from "react";
import styles from './info.module.css';
import btlushka from '../../../../public/static/images/default/btlushka.jpg'

export const InformationUI: FC = () => {
  return (
    <div className={styles.about}>
      <div className={styles.infoBox}>
        <h2 className={styles.title}>About us</h2>
        <p className={styles.text}>SwAg MuSSSiC is a music website designed for all music lovers, regardless of their preferences and age. It offers users the ability to listen to music from an extensive library of tracks across various genres and artists. Users can create and save their own playlists for different moods and situations, as well as receive personalized recommendations based on their musical preferences.<br/><br/>The site allows users to share their favorite tracks and playlists with friends through social networks and within the platform. Users can stay updated with the latest music industry news, new releases, and upcoming concerts. SwAg MuSSSiC also offers interactive features such as polls, contests, and other events in which users can participate.<br/><br/>The platform supports independent artists by providing them with the opportunity to promote their music and reach new audiences. Users can discover new artists and support their creativity. Social interaction on the site allows users to communicate with each other, discuss music, and share opinions.<br/><br/>SwAg MuSSSiC ensures high-quality sound, allowing users to enjoy music without loss of quality. For user convenience, a mobile app is available, enabling music listening anywhere and anytime. Overall, SwAg MuSSSiC aims to create a convenient and engaging platform for everyone who loves music, offering numerous opportunities for interaction and enjoyment of musical content.</p>
      </div>
      <div className={styles.imgBox}>
        <img className={styles.image} src={btlushka} alt="Btlushka" />
      </div>
    </div>)
}