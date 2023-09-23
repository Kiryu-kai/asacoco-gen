import React from 'react';
import styles from '@/components/form-controls/Common.module.scss';

type Component = React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    /** [選択項目名, 値][] */
    options: [string, string][];
  }
>;

export const Select: Component = ({ label, options, ...props }) => {
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
