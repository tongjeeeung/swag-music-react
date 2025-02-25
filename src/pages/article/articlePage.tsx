import { FC, useEffect } from "react";
import { Article } from "../../components";
import styles from "./article.module.css";

export const ArticlePage: FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="main">
      <div className={styles.article}>
        <Article></Article>
      </div>
    </main>
  );
};
