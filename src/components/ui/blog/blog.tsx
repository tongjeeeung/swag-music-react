import { FC, useEffect, useState } from "react";
import styles from './blog.module.css';
import { TBlogUIProps } from "./type";
import { Link } from "react-router-dom";

export const BlogUI: FC<TBlogUIProps> = ({ children }) => {
  const [moreIndex, setIndex] = useState<number>(3);
  const [sliderValue, setValue] = useState<number>(550);
  const [randArr] = useState<number[]>([]);

  useEffect(() => {
    for(let i = 0; i < 3; i++) {
      const rand = Number(Math.random().toFixed(1)) * 10;
      if (rand !== 10) {
        randArr.find((index) => index === rand) ? i-- : randArr.push(rand);
      }
      else i--;
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (sliderValue < 480 * children.length) {
        setValue(sliderValue + 2);
      }
      else {
        setValue(550);
      }}, 10)
  }, [sliderValue])

  const handleMore = () => {
    if (children.length >= moreIndex) {
      if (children.length - moreIndex > 3) {
        setIndex(moreIndex + 4);
      }
      else {
        setIndex(children.length - 1);
      }
    }
  }

  return (
  <div className={styles.blog}>
    <ul className={styles.new}>
      <li className={styles.new_item}>
        <Link to={`/swag-music-react/blog/${children[children.length - 1]._id}`} key={children[children.length - 1]._id} style={{ textDecoration: 'none', color: "inherit" }}>
          <div className={styles.box}>
            <img className={styles.image} src={children[children.length - 1].image} alt={children[children.length - 1].name} />
          </div>
          <h2 className={styles.name}>{children[children.length - 1].name}</h2>
          <h3 className={styles.title}>{children[children.length - 1].title}</h3>
          <button className={styles.button}>Article</button>
        </Link>
      </li>
      <li className={styles.new_item}>
        <Link to={`/swag-music-react/blog/${children[children.length - 2]._id}`} key={children[children.length - 2]._id} style={{ textDecoration: 'none', color: "inherit" }}>
          <div className={styles.box}>
            <img className={styles.image} src={children[children.length - 2].image} alt={children[children.length - 2].name} />
          </div>
          <h2 className={styles.name}>{children[children.length - 2].name}</h2>
          <h3 className={styles.title}>{children[children.length - 2].title}</h3>
          <button className={styles.button}>Article</button>
        </Link>
      </li>
    </ul>
    <div className={styles.slider_box}>
      <ul className={styles.slider} style={{transform: `translate(-${sliderValue}px, 0px)`}}>
        {children.map((article) => {
          return (
            <Link className={styles.slider_item} to={`/swag-music-react/blog/${article._id}`} key={article._id} style={{ textDecoration: 'none', color: "inherit" }}>
              <h2 className={styles.name}>{article.name}</h2>
              <h3 className={styles.title}>{article.title}</h3>
            </Link>
            )
        })}
      </ul>
    </div>
    <ul className={styles.old}>
      {children.map((article, index) => {
        if (index < 4) {
          return (
            <Link className={styles.old_item} to={`/swag-music-react/blog/${article._id}`} key={article._id} style={{ textDecoration: 'none', color: "inherit" }}>
              <div className={styles.old_box}>
                <img className={styles.image} src={article.image} />
              </div>
              <div className={styles.information_box}>
                <h3 className={styles.title}>{article.name}</h3>
                <button className={styles.button}>Article</button>
              </div>
            </Link>)
        }
      })}
    </ul>
    <ul className={styles.favorites}>
      <Link className={styles.favorites_item} to={`/swag-music-react/blog/${children[children.length - 3]._id}`} key={children[children.length - 3]._id} style={{ textDecoration: 'none', color: "inherit" }}>
        <img className={styles.image} src={children[children.length - 3].image} alt={children[children.length - 3].name} />
        <h2 className={styles.name}>{children[children.length - 3].name}</h2>
      </Link>
      <Link className={styles.favorites_item} to={`/swag-music-react/blog/${children[children.length - 4]._id}`} key={children[children.length - 4]._id} style={{ textDecoration: 'none', color: "inherit" }}>
        <img className={styles.image} src={children[children.length - 4].image}  alt={children[children.length - 4].name} />
        <h2 className={styles.name}>{children[children.length - 4].name}</h2>
      </Link>
    </ul>
    <ul className={styles.rand}>
    {children.map((_article, index) => {
        if (index < 3 && randArr.length > 0) {
          return (
          <Link to={`/swag-music-react/blog/${children[randArr[index]]._id}`} key={children[randArr[index]]._id} style={{ textDecoration: 'none', color: "inherit" }}>
            <li className={styles.rand_item}>
              <div className={styles.box}>
                <img className={styles.image} src={children[randArr[index]].image}  alt={children[randArr[index]].name} />
              </div>
              <h2 className={styles.name}>{children[randArr[index]].name}</h2>
              <button className={styles.button}>Article</button>
            </li>
          </Link>)
        }
      })}
    </ul>
    <ul className={styles.last}>
      {children.map((article, index) => {
        if (index <= moreIndex) {
          return (
            <Link className={styles.last_item} to={`/swag-music-react/blog/${article._id}`} key={article._id} style={{ textDecoration: 'none', color: "inherit" }}>
              <div className={styles.box}>
                <img className={styles.image} src={article.image}  alt={article.name} />
              </div>
              <h2 className={styles.name}>{article.name}</h2>
              <h3 className={styles.title}>{article.title}</h3>
              <button className={styles.button}>Article</button>
            </Link>) 
        }
      })}
    </ul>
    {moreIndex !== children.length - 1 ? (<div className={styles.buttonBox}>
      <button className={styles.button} onClick={handleMore}>More</button>
      </div>) : ('')}
  </div>)}