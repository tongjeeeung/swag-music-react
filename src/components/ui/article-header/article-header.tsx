import { FC } from "react";
import styles from './article-header.module.css';
import { TArticleHeaderProps } from "./type";

export const ArticleHeaderUI: FC<TArticleHeaderProps> = ({name, titleFir, titleSec, imgFir, imgSec}) => (
  <div className={styles.columns}>
    <div className={styles.column_1}>
      <img className={styles.image} src={imgFir} />
    </div>
    <div className={styles.column_2}>
      <div className={styles.info}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.info_columns}>
          <h3 className={styles.title}>{titleFir}</h3>
          <h3 className={styles.title}>{titleSec}</h3>
        </div>
      </div>
      <div className={styles.box}>
        <img className={styles.image} src={imgSec} />
      </div>
    </div>
  </div>
);