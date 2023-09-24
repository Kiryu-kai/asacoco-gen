import React, { useEffect, useState } from 'react';

import styles from '@/components/structures/Footer.module.scss';

export function Footer() {
  const [isExpanded, setExpanded] = useState(false);
  const onclick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setExpanded(!isExpanded);
  };
  const stopPropagetion = (e: React.MouseEvent) => e.stopPropagation();

  useEffect(() => {
    window.addEventListener('click', () => {
      if (isExpanded) {
        setExpanded(!isExpanded);
      }
    });
  });

  return (
    <footer className={styles.wrap} data-is-expanded={isExpanded}>
      <p className={styles.copyright}>
        <small>
          ©︎ 2019 Coco Kiryu -{' '}
          <button type="button" className={styles.btn} onClick={onclick} aria-expanded={isExpanded}>
            Materials
          </button>{' '}
          - <a href="https://github.com/Kiryu-kai/asacoco-gen">Repository</a> - <a href="/">Home</a>
        </small>
      </p>

      <div className={styles.material} hidden={!isExpanded}>
        <div className={styles.material__inner} onClick={stopPropagetion}>
          <h2 className={styles.material__hdg}>Materials</h2>

          <p className={styles.material__p}>The collaborators are different for each directory.</p>

          <p className={styles.material__p}>This top page is supported by the following works.</p>

          <ul className={styles.material__ul}>
            <li className={styles.material__li}>
              <a
                href="https://www.youtube.com/channel/UCS9uQI-jC3DE0L4IpXyvr6w"
                rel="noopener noreferrer"
                target="_blank"
              >
                Coco Ch. 桐生ココ - YouTube
              </a>
            </li>
            <li className={styles.material__li}>
              <a href="https://youtu.be/fcDwI4OYlRw" rel="noopener noreferrer" target="_blank">
                Pekora Ch. 兎田ぺこら - YouTube
              </a>
            </li>
            <li className={styles.material__li}>
              <a
                href="https://twitter.com/kiryucoco/status/1218277670040956928"
                rel="noopener noreferrer"
                target="_blank"
              >
                桐生ココ🐉 (@kiryucoco) - Twitter
              </a>
            </li>
            <li className={styles.material__li}>
              <a
                href="https://twitter.com/kiryucoco/status/1246839005649330176"
                rel="noopener noreferrer"
                target="_blank"
              >
                桐生ココ🐉 (@kiryucoco) - Twitter
              </a>
            </li>
            <li className={styles.material__li}>
              <a href="https://cover-corp.com/" rel="noopener noreferrer" target="_blank">
                Talent Images - COVER Corp.
              </a>
            </li>
            <li className={styles.material__li}>
              <a
                href="http://nicofont.pupu.jp/nicoca.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                ニコカ - まるもじフォント（ニコモジ）配布所
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
