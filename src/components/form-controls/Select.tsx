import React from 'react';
import styles from './Common.module.scss';

type Component = React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  /** [選択項目名, 値][] */
  options: ([string, string] | [string, string, boolean])[]
}>

export const Select: Component = ({label, options, ...props}) => {
  return (
    <label className={styles.host}>
      <span className={styles.label}>
        {label}
      </span>
      <span className={styles.wrap}>
        <select {...props} className={styles.input}>
          {
            options.map(([name, value, selected]) => (
              <option value={value} key={name} selected={selected}>{name}</option>
            ))
          }
        </select>
      </span>
    </label>
  );
};
