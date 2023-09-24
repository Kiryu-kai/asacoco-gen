import React, { useState } from 'react';

import styles from '@/components/App.module.scss';
import { Editor } from '@/components/Editor/Editor';
import { Footer, Header } from '@/components/structures';

function App() {
  const [themeId, setThemeId] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? '1' : '0',
  );

  const [emit, setEmit] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <div data-theme={themeId}>
      <Header themeId={themeId} setThemeId={setThemeId} />
      <main>
        <Editor />

        <div className={styles.download}>
          <p className={styles.agree}>
            <label className={styles.agree__wrap}>
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className={styles.agree__input}
              />
              <span className={styles.agree__label}>
                <a href="#guidelines">お願いと免責事項</a>
                に同意し、所属タレントやあなたの作品を見た方への心情に配慮すること誓います。
              </span>
            </label>
          </p>

          {emit ? (
            <div hidden={!agree}>
              <h2 className={styles.download__h2}>ダウンロード</h2>
              <p className={styles.download__imgWrap}>
                <img src={emit} alt="作った画像" className={styles.download__img} />
              </p>
              <p className={styles.download__link}>
                <a href={emit} download={`asacoco-${performance.now()}.png`}>
                  Download
                </a>
              </p>
              <p className={styles.download__note}>※ クリックしてから少し時間がかかります</p>
            </div>
          ) : (
            <></>
          )}

          <p className={styles.download__btnWrap}>
            <button
              onClick={() => {
                setEmit(
                  document.querySelector<HTMLCanvasElement>('#canvas-wrapper canvas')!.toDataURL(),
                );
              }}
              className={styles.download__btn}
              disabled={!agree}
            >
              画像として書き出し
            </button>
          </p>
        </div>

        <div className={styles.content} id="guidelines">
          <h2>お願い・免責事項</h2>

          <p>
            利用に際しては深い愛を以って、
            <a href="https://www.hololive.tv/terms" target="_blank" rel="noreferrer">
              カバー株式会社のガイドライン
            </a>
            に準拠してください。
          </p>

          <ul>
            <li>
              Twitterへ投稿するときは、公式ではないこと・これまでの企画との混同を避けるために、あさココ系のハッシュタグはつけないか「
              <a
                href="https://twitter.com/intent/tweet?url=https://kiryu-kai.github.io/asacoco-gen&amp;hashtags=あさココジェネレーター"
                target="_blank"
                rel="noreferrer"
              >
                #あさココジェネレーター
              </a>
              」をつけて投稿してください。
            </li>
            <li>
              本ツールを利用して被ったいかなる損害について、一切責任は負えません。自己責任でお願いします。
            </li>
            <li>
              素材提供やアイディア、利用素材の中止申請等は
              <a
                href="https://github.com/Kiryu-kai/asacoco-gen/issues"
                target="_blank"
                rel="noreferrer"
              >
                GitHub Issue
              </a>
              へお願いいたします。
            </li>
            <li>
              今後の開発予定と作業中のタスクは
              <a
                href="https://github.com/Kiryu-kai/asacoco-gen/projects/1"
                target="_blank"
                rel="noreferrer"
              >
                GitHub Projects
              </a>
              でご確認いただけます。
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
