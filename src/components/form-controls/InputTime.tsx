import React, { useEffect, useState } from 'react';

import styles from '@/components/App.module.scss';
import { Input } from '@/components/form-controls/parts';

type Props = {
  timeText: string;
  setTimeText: React.Dispatch<React.SetStateAction<string>>;
};

const toggleIntervalState = (() => {
  let key = -1;
  const updateTimeText = ({
    setTimeText,
  }: {
    setTimeText: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const date = new Date();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    setTimeText(`${hour}:${minute}`);
  };

  return ({
    isCurrentTime,
    setTimeText,
  }: {
    isCurrentTime: boolean;
    setTimeText: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    clearInterval(key);

    if (!isCurrentTime) {
      return;
    }

    const timerHandler = () => updateTimeText({ setTimeText });

    timerHandler();
    key = window.setInterval(timerHandler, 1000);
  };
})();

export const InputTime = ({ timeText, setTimeText }: Props) => {
  const [isCurrentTime, setIsCurrentTime] = useState(true);

  useEffect(() => {
    toggleIntervalState({ isCurrentTime, setTimeText });

    return () => {
      toggleIntervalState({ isCurrentTime: false, setTimeText });
    };
  }, [isCurrentTime]);

  return (
    <>
      <p className={styles.ui__child}>
        <Input
          label="現在時刻"
          type="checkbox"
          onChange={() => {
            setIsCurrentTime(!isCurrentTime);
          }}
          checked={isCurrentTime}
        />
      </p>

      <p className={styles.ui__child}>
        <Input
          label="時間"
          type="time"
          onChange={(e) => setTimeText(e.target.value)}
          value={timeText}
          disabled={isCurrentTime}
        />
      </p>
    </>
  );
};
