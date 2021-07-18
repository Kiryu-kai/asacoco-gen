import React from 'react';
import styles from './Common.module.scss';

type Component = React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  note?: string | string[]
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
          typeof note === 'string' ?
            <span className={styles.note}>{note}</span> :
            note.map((s) => {
              return <span className={styles.note} key={s}>{s}</span>;
            }) :
          null
        }
        <textarea {...props} className={styles.textarea} />
      </span>
    </label>
  );
};
