import { FC, useEffect, useRef, useState } from "react";
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from "./type";
import logoGif from '../../../../public/static/images/default/logo.gif';
import avatarDefault from '../../../../public/static/images/default/avatar.jpg';
import { Link } from "react-router-dom";
import { SearchUI } from "../search";
import { useSelector } from "../../../services/store";
import { getExecutors } from "../../../services/executorSlice";

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName, userAvatar, thremeVoid, logOutHandle }) => {
  const headerRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLLIElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const artists = useSelector(getExecutors)

  useEffect(() => {
    if (headerRef.current && profileRef.current && contentRef.current) {
      const contentHandle = () => {
        headerRef!.current!.style.height = '18vh';
        contentRef!.current!.style.display = 'flex';
      }

      const contentOutHandle = (e: MouseEvent) => {
        const target = e.relatedTarget as HTMLElement | null;

        if (target && (!target.classList.contains(styles.link) && !target.classList.contains(`${styles.link}:hover`) && !target.classList.contains(styles.content))) {
          headerRef!.current!.style.cssText = '';
          contentRef!.current!.style.display = 'none';
        }
      }

      profileRef.current.addEventListener(('mouseover'), contentHandle);
      contentRef.current.addEventListener(('mouseout'), (e) => contentOutHandle(e));

      return () => {
        if (profileRef.current) {
          profileRef.current.removeEventListener('mouseover', contentHandle);
        }
        if (contentRef.current) {
          contentRef.current.removeEventListener('mouseout', contentOutHandle);
        }
      };
    }
  }, [headerRef.current, userName])

  const handleSearch = () => {
    setIsSearch(!isSearch);
  }

  return <>
  {isSearch && (<SearchUI artists={artists} handleSearch={handleSearch}></SearchUI>)}
  <header className={styles.header} ref={headerRef}>
    <ul className={styles.header_menu}>
      <Link to={'/home'} style={{ textDecoration: 'none', color: "inherit" }}>
        <li className={styles.menu_item}>Home</li>
      </Link>
      <Link to={'/playlists'} style={{ textDecoration: 'none', color: "inherit" }}>
        <li className={styles.menu_item}>Playlist</li>
      </Link>
      <li className={styles.menu_item} onClick={handleSearch}>Search</li>
    </ul>
    <div className={styles.header_menu} onClick={thremeVoid}>
      <img className={styles.menu_logo} src={logoGif} alt="logo"/>
      <span className={styles.title_menu}>SwAg MuSSSiC</span>
    </div>
    <ul className={styles.header_menu}>
      <Link to={'/blog'} style={{ textDecoration: 'none', color: "inherit" }}>
        <li className={styles.menu_item}>Blog</li>
      </Link>
      <Link to={'/information'} style={{ textDecoration: 'none', color: "inherit" }}>
        <li className={styles.menu_item}>Information</li>
      </Link>
      {userName ? (<li className={styles.menu_item} ref={profileRef}>
        <img className={styles.menu_avatar} src={userAvatar} alt={userName}/>
      </li>) : (<Link to={'/login'} style={{ textDecoration: 'none', color: "inherit" }}>
        <li className={styles.menu_item}>
          <img className={styles.menu_avatar} src={avatarDefault} alt={'Profile'}/>
        </li>
      </Link>)}
    </ul>
    <div className={styles.content} ref={contentRef}>
      <Link to={'/profile'} className={styles.link}>Profile</Link>
      <button className={styles.link} onClick={logOutHandle}>Log out</button>
    </div>
  </header>
</>}
