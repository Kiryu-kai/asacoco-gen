import React from 'react';

import styles from '@/components/App.module.scss';
import { Input, Textarea } from '@/components/Editor/parts/form-controls/parts';

import { convertToCommentString, formatComment } from '@/utils/comment';

type Props = {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  commentCrop: number;
  setCommentCrop: React.Dispatch<React.SetStateAction<number>>;
};

export const InputComment = ({ comment, setComment, commentCrop, setCommentCrop }: Props) => {
  return (
    <>
      <p className={styles.ui__child}>
        <Textarea
          label="コメント"
          rows={10}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onBlur={(e) => {
            const { value } = e.target;
            const commentData = formatComment({ comment: value });

            setComment(convertToCommentString(commentData));
          }}
          value={comment}
          note="名前を「!」で始めるとメンバーシップ"
        />
      </p>

      {/* <div className={styles.ui__child}> */}
      {/* 個別調整機能は一旦非公開 */}
      {/* <ul>
              {comment.map(([name, value, price], idx) => {
                return (
                  <li key={idx}>
                    <input
                      value={name}
                      onChange={(e) => {
                        comment[idx][0] = e.target.value;
                        setComment([...comment]);
                      }}
                    />
                    <input
                      value={value}
                      onChange={(e) => {
                        comment[idx][1] = e.target.value;
                        setComment([...comment]);
                      }}
                    />
                    <input
                      value={price}
                      onChange={(e) => {
                        comment[idx][2] = e.target.value;
                        setComment([...comment]);
                      }}
                    />
                  </li>
                );
              })}
            </ul> */}
      {/* </div> */}

      <p className={styles.ui__child}>
        <Input
          label="コメントクロップ"
          type="range"
          min={0}
          step={10}
          max={300}
          onChange={(e) => setCommentCrop(Number(e.target.value))}
          value={commentCrop}
        />
      </p>
    </>
  );
};
