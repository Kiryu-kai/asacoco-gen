import React, {useEffect} from 'react';
import logo from '../images/logo.png';
import * as styles from './Header.module.scss';

export const Header = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.dataset.color = '1';
    }
  });

  return (
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

      <p style={{
        padding: '0 20px',
        textAlign: 'center',
      }}>調査中：スマホだと画像が保存できない不具合が確認されています（スクショなら大丈夫）</p>
    </header>
  );
};
