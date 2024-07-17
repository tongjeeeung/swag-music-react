import { FC } from "react";
import styles from './not-found.module.css';
import notFound from '../../../public/static/images/default/notFound.png';
import { Link } from "react-router-dom";

export const NotFound404: FC = () => (
  <main className='main'>
    <div className={styles.not}>
      <div className={styles.box}>
        <img src={notFound} className={styles.image}/>
      </div>
      <div className={styles.box2}>
        <h2 className={styles.name}>not found 404:/</h2>
        <h3 className={styles.title}>you can visit the home page</h3>
        <Link to={'/home'} style={{ textDecoration: 'none', color: "inherit" }}>
          <button className={styles.button}>click me</button>
        </Link>
      </div>
    </div>
  </main>
);