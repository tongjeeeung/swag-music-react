import { FC } from "react";
import styles from './profile-edit.module.css';
import { ProfileEditUIProps } from "./type";

export const ProfileEditUI: FC<ProfileEditUIProps> = ({name, setName, email, setEmail, avatar, setAvatar, handleSubmit}) => (
  <form className={styles.form} name="edit" onSubmit={handleSubmit}>
    <label className={styles.label}>Name</label>
    <input className={styles.input} type="name" value={name} onChange={(e) => setName(e.target.value)}></input>
    <label className={styles.label}>Email</label>
    <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
    <label className={styles.label}>Avatar</label>
    <input className={styles.input} type="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)}></input>
    <button className={styles.button}>Save</button>
    <button className={styles.button}>Cancel</button>
  </form>
)