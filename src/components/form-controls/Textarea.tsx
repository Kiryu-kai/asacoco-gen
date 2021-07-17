import React from 'react';
import styles from './Common.module.scss';

type Component = React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  note?: string
}>

export const Textarea: Component = ({label, note, ...props}) => {
  return (
    <label className={styles.host}>
      <span className={styles.label}>
        {label}
      </span>
      <span className={styles.wrap}>
        {
          note ?
          <span className={styles.note}>{note}</span> :
          null
        }
        <textarea {...props} className={styles.textarea} />
      </span>
    </label>
  );
};
