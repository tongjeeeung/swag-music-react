import { FC } from "react";
import styles from './profile.module.css';
import { ProfileInfoUI } from "../profile-info";
import { ProfileEditUI } from "../profile-edit/profile-edit";
import { ProfileUIProps } from "./type";
import { PlayListListUI } from "../playlist-list";

export const ProfileUI: FC<ProfileUIProps> = ({name, setName, email, setEmail, avatar, setAvatar, editHadnle, edit, handleSubmit, userAlbums, locationState}) => (
  (<div className={styles.profile}>
    <div className={styles.column}>
      <div className={styles.box}>
        <img className={styles.image} src={avatar}/>
      </div>
      <>{!edit ? (<ProfileInfoUI name={name} email={email} editHandle={editHadnle}></ProfileInfoUI>) : 
      (<ProfileEditUI name={name} setName={setName} email={email} setEmail={setEmail} avatar={avatar} setAvatar={setAvatar} handleSubmit={handleSubmit}></ProfileEditUI>)}</>
    </div>
    <div style={{width: "100%", overflow: 'scroll'}}>
      <PlayListListUI title="Your MuSSSiC" children={userAlbums ? userAlbums : []} locationState={locationState} isAuth={true}></PlayListListUI>
    </div>
  </div>)
)