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
        <div className={styles.content} id="guidelines">
          <h2>お願い・免責事項</h2>

          <p>利用に際しては深い愛を以って、<a href="https://www.hololive.tv/terms" target="_blank" rel="noreferrer">カバー株式会社のガイドライン</a>に準拠してください。</p>

          <ul>
            <li>Twitterへ投稿するときは、公式ではないこと・これまでの企画との混同を避けるために、あさココ系のハッシュタグはつけないか「<a href="https://twitter.com/intent/tweet?url=https://kiryu-kai.github.io/asacoco-gen&amp;hashtags=あさココジェネレーター" target="_blank" rel="noreferrer">#あさココジェネレーター</a>」をつけて投稿してください。</li>
            <li>本ツールを利用して被ったいかなる損害について、一切責任は負えません。自己責任でお願いします。</li>
            <li>素材提供やアイディア、利用素材の中止申請等は<a href="https://github.com/Kiryu-kai/asacoco-gen/issues" target="_blank" rel="noreferrer">Issue</a>へお願いいたします。</li>
          </ul>
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
