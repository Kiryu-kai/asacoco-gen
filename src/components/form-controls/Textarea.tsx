import React from 'react';
import styles from './Common.module.scss';

type Component = React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
}>

export const Textarea: Component = ({label, ...props}) => {
  return (
    <label className={styles.host}>
      <span className={styles.label}>
        {label}
      </span>
      <span className={styles.wrap}>
        <textarea {...props} className={styles.textarea} />
      </span>
    </label>
  );
};
