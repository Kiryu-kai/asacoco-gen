import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import styles from './index.module.scss';
import './common.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
      <Header />
      <main>
        <App />
        <div className={styles.content}>
          <h2>免責事項</h2>

          <p>利用に際しては、<a href="https://www.hololive.tv/terms">カバー株式会社のガイドライン</a>に準拠してください。</p>

          <ul>
            <li>Twitterへ投稿するときは、公式ではないこと・これまでの企画との混同を避けるために「<a href="https://twitter.com/intent/tweet?url=https://kiryu-kai.github.io/asacoco-gen&amp;hashtags=あさココジェネレータ" target="_blank" rel="noreferrer">#あさココジェネレータ</a>」をつけて投稿してください。</li>
            <li>本ツールを利用して被ったいかなる損害について、一切責任は負えません。自己責任でお願いします。</li>
            <li>素材提供やアイディア、利用素材の中止申請等は<a href="https://github.com/Kiryu-kai/asacoco-gen/issues">Issue</a>へお願いいたします。</li>
          </ul>

          <p>作った画像は右クリックで保存できます（スマホはホールド）。</p>
        </div>
      </main>
      <Footer />
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
