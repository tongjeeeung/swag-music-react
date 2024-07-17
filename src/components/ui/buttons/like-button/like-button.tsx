import { FC, MouseEventHandler } from "react";
import styles from './like-button.module.css';
import likeSvg from '../../../../assets/svg/heart.svg';
import clsx from "clsx";

export const LikeButton: FC<{likeVoid: MouseEventHandler, isLike: boolean}> = ({ likeVoid, isLike }) => (
  <button className={styles.like_button} onClick={likeVoid}>
    <svg className={clsx(styles.like_svg, {[styles.active]: isLike})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <use href={likeSvg + "#heart"}></use>
    </svg>
  </button>
)