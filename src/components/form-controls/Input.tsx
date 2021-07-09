import React from 'react';
import styles from './Common.module.scss';

type Component = React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
  /** アクセシビリティネーム */
  label: string,
  /** 入力候補 */
  datalist?: string[]
}>
let id = 0;

export const Input: Component = ({label, datalist, ...props}) => {
  id++;

  if (datalist?.length) {
    props.list = `${styles.input}-${id}`;
  }

  const input = [
    <input {...props} className={styles.input} key={id} />,
    (
      datalist?.length ?
      <datalist id={props.list}>
        {
          datalist.map((value) => <option value={value} key={value} />)
        }
      </datalist> :
      <></>
    ),
  ];

  return (
    <label className={styles.host}>
      <span className={styles.label}>
        {label}
      </span>
      <span className={styles.wrap}>
        {input}
      </span>
    </label>
  );
};
