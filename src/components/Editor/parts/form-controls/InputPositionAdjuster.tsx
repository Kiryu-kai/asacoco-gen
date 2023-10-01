import React from 'react';

import uniqueStyles from '@/components/Editor/parts/form-controls/InputPositionAdjuster.module.scss';
import styles from '@/components/Editor/parts/form-controls/parts/Common.module.scss';

type Component = React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** アクセシビリティネーム */
    label: string | React.ReactNode;
    direction: 'x' | 'y';
    btns: {
      label: string;
      onClick: () => void;
    }[];
  }
>;

let id = 0;

export const InputPositionAdjuster: Component = ({ label, direction, btns, ...props }) => {
  id++;

  return (
    <span
      className={styles.host}
      role="group"
      aria-labelledby={`InputPositionAdjuster-${id}`}
      data-direction={direction}
    >
      <span className={styles.label} id={`InputPositionAdjuster-${id}`}>
        {label}
      </span>
      <span className={styles.wrap} data-type={props.type}>
        <span className={uniqueStyles.lyt}>
          {btns.map((item) => (
            <span className={uniqueStyles.item} key={item.label}>
              <button
                className={uniqueStyles.btn}
                onClick={item.onClick}
                data-type={item.label}
                {...props}
              >
                <span className={uniqueStyles.txt}>{item.label}</span>
              </button>
            </span>
          ))}
        </span>
      </span>
    </span>
  );
};
