import { FC } from "react";
import { Article } from "../../components";
import styles from './article.module.css';

export const ArticlePage: FC = () => {
  return (
    <main className='main'>
      <div className={styles.article}>
        <Article></Article>
      </div>
    </main>
  )
}