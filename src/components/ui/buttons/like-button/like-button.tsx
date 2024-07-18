import { FC, MouseEventHandler } from "react";
import styles from './like-button.module.css';
//import likeSvg from '../../../../../public/static/svg/heart.svg';
import clsx from "clsx";

export const LikeButton: FC<{likeVoid: MouseEventHandler, isLike: boolean}> = ({ likeVoid, isLike }) => (
  <button className={styles.like_button} onClick={likeVoid}>
    <svg className={clsx(styles.like_svg, {[styles.active]: isLike})} width="24" height="24" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="m59.5 25c0-6.9036-5.5964-12.5-12.5-12.5-4.7533 0-8.8861 2.6536-11 6.5598-2.1139-3.9062-6.2467-6.5598-11-6.5598-6.9036 0-12.5 5.5964-12.5 12.5 0 2.9699 1.0403 5.6942 2.7703 7.8387l-.0043.0034 20.734 25.6976 20.7339-25.6975-.0043-.0034c1.7301-2.1446 2.7704-4.8689 2.7704-7.8388z"/>
      <path fill="currentColor" d="m59.5 25c0-6.9036-5.5964-12.5-12.5-12.5-4.7533 0-8.8861 2.6536-11 6.5598-2.1139-3.9062-6.2467-6.5598-11-6.5598-6.9036 0-12.5 5.5964-12.5 12.5 0 2.9699 1.0403 5.6942 2.7703 7.8387l-.0043.0034 20.734 25.6976 20.7339-25.6975-.0043-.0034c1.7301-2.1446 2.7704-4.8689 2.7704-7.8388z" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
    </svg>
  </button>
)