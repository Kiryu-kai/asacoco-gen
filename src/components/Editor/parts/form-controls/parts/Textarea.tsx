import React from 'react';

import styles from '@/components/Editor/parts/form-controls/parts/Common.module.scss';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  note?: string | string[];
};

export const Textarea = ({ label, note, ...props }: Props) => {
  return (
    <label className={styles.host}>
      <span className={styles.label}>{label}</span>
      <span className={styles.wrap}>
        {note ? (
          typeof note === 'string' ? (
            <span className={styles.note}>{note}</span>
          ) : (
            note.map((s) => {
              return (
                <span className={styles.note} key={s}>
                  {s}
                </span>
              );
            })
          )
        ) : null}
        <textarea {...props} className={styles.textarea} />
      </span>
    </label>
  );
};
