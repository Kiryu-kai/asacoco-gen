import React from 'react';

import styles from '@/components/structures/Header.module.scss';

import LOGO_SRC from '@/images/logo.png';

type Props = {
  themeId: string;
  setThemeId: React.Dispatch<React.SetStateAction<string>>;
};

export const Header = ({ themeId, setThemeId }: Props) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>
        <img src={LOGO_SRC} alt="あさココLIVEジェネレータ" className={styles.logo} />
      </h1>

      <div className={styles.ui}>
        <p className={styles.item}>
          <button
            className={styles.btn}
            onClick={() => setThemeId('0')}
            aria-pressed={themeId ? 'true' : 'false'}
          >
            デフォルト
          </button>
        </p>
        <p className={styles.item}>
          <button
            className={styles.btn}
            onClick={() => setThemeId('1')}
            aria-pressed={themeId ? 'true' : 'false'}
          >
            ダークブルー
          </button>
        </p>
        <p className={styles.item}>
          <button
            className={styles.btn}
            onClick={() => setThemeId('2')}
            aria-pressed={themeId ? 'true' : 'false'}
          >
            ブラック
          </button>
        </p>
      </div>

      {/* <p style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '0 20px',
        fontSize: 14,
      }}>
        <span style={{
          whiteSpace: 'nowrap',
        }}>お知らせ：</span>
        <span>
          AndroidおよびiOSのGoogle Chromeで画像が保存できない不具合が確認されています（Safariやスクショなら大丈夫）。<br/><a href="https://github.com/Kiryu-kai/asacoco-gen/projects/1" target="_blank" rel="noreferrer">今後の開発予定と作業中のタスクはこちらから</a>！
        </span>
      </p> */}
    </header>
  );
};
