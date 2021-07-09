import React from 'react';
import styles from './Common.module.scss';

type Component = React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
  /** アクセシビリティネーム */
  label: string,
}>

export const Input: Component = ({label, datalist, ...props}) => {
  return (
    <label className={styles.host}>
      <span className={styles.label}>
        {label}
      </span>
      <span className={styles.wrap}>
        <input {...props} className={styles.input} />
      </span>
    </label>
  );
};
