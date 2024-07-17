import { FC } from "react";
import styles from './footer.module.css';
import vkSvg from '../../../assets/svg/iconVk.svg';
import tgSvg from '../../../assets/svg/iconTg.svg';

export const FooterUI: FC = () => (
  <footer className={styles.footer}>
    <h5 className={styles.footer_title}>SwAg MuSSSiC</h5>
    <address className={styles.address}>
      <a className={styles.address_link} href="tel:+74953254522">+7 495 325 45 22</a>
      <br/>
      <a className={styles.address_link} href="mailto:tngtng@gmail.com">tngtng@gmail.com</a>
      <p>Москва, Бехтерева, 15</p>
    </address>
    <div className={styles.footer_icons}>
      <a href="https://vk.com/tongjeeeung">
        <svg className={styles.link_icon}>
          <use href={vkSvg + '#vk'}></use>
        </svg>
      </a>
      <a href="https://web.telegram.org/a/">
        <svg className={styles.link_icon}>
          <use href={tgSvg + '#telegram'}></use>
        </svg>
      </a>
    </div>
  </footer>
) 