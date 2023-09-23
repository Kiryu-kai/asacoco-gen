import React from 'react';
import styles from '@/components/form-controls/Common.module.scss';
import uniqueStyles from '@/components/form-controls/PositionAdjuster.module.scss';

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

export const PositionAdjuster: Component = ({ label, direction, btns, ...props }) => {
  id++;

  return (
    <span
      className={styles.host}
      role="group"
      aria-labelledby={`PositionAdjuster-${id}`}
      data-direction={direction}
    >
      <span className={styles.label} id={`PositionAdjuster-${id}`}>
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
