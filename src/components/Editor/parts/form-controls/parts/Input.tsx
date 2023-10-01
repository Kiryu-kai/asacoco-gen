import React from 'react';

import styles from '@/components/Editor/parts/form-controls/parts/Common.module.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  /** アクセシビリティネーム */
  label: string | React.ReactNode;
};

export const Input = ({ label, ...props }: Props) => {
  // ? input + span 構造が使えないのでラッパーに属性を持たせます
  const attr =
    props.type === 'radio' || props.type === 'checkbox'
      ? {
          'data-checked': props.checked,
        }
      : {};

  return (
    <label className={styles.host}>
      <span className={styles.label}>{label}</span>
      <span className={styles.wrap} {...attr} data-type={props.type}>
        <input {...props} className={styles.input} />
      </span>
    </label>
  );
};
