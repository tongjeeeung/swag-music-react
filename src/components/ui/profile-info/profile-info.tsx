import { FC } from "react";
import styles from './profile-info.module.css';
import { ProfileInfoUIProps } from "./type";

export const ProfileInfoUI: FC<ProfileInfoUIProps> = ({name, email, editHandle}) => (
  <div className={styles.info}>
    <h2 className={styles.name}>{name}</h2>
    <h3 className={styles.email}>{email}</h3>
    <button className={styles.button} onClick={editHandle}>Edit profile</button>
  </div>
)