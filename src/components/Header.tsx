import React from 'react';
import logo from '../images/logo.png';
import * as styles from './Header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.h1}>
      <img src={logo} alt="あさココLIVEジェネレータ" className={styles.logo} />
    </h1>

    <div className={styles.ui}>
      <p className={styles.item}>
        <button className={styles.btn} onClick={() => document.body.dataset.color ='0'}>デフォルト</button>
      </p>
      <p className={styles.item}>
        <button className={styles.btn} onClick={() => document.body.dataset.color ='1'}>ダークブルー</button>
      </p>
      <p className={styles.item}>
        <button className={styles.btn} onClick={() => document.body.dataset.color ='2'}>ブラック</button>
      </p>
    </div>
  </header>
);
