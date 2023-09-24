import React from 'react';

import styles from '@/components/Editor/parts/form-controls/parts/Common.module.scss';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  /** [選択項目名, 値][] */
  options: [string, string][];
};

export const Select = ({ label, options, ...props }: Props) => {
  return (
    <label className={styles.host}>
      <span className={styles.label}>{label}</span>
      <span className={styles.wrap}>
        <select {...props} className={styles.select}>
          {options.map(([name, value]) => (
            <option value={value} key={name}>
              {name}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
};
