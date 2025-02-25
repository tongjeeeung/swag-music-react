import { FC, MouseEventHandler } from "react";
import styles from "./cookie.module.css";

export const CookieUI: FC<{ acceptCookie: MouseEventHandler }> = ({
  acceptCookie,
}) => {
  return (
    <div className={styles.block}>
      <span className={styles.text}>We eat cookies</span>
      <button onClick={acceptCookie} className={styles.button}>
        Accept
      </button>
    </div>
  );
};
