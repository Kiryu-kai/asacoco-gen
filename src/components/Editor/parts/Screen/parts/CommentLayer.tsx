import React from 'react';
import { Group, Image, Text } from 'react-konva';

import { streamModeList } from '@/contants/dataset';

import { createImage } from '@/components/Editor/parts/Screen/create-image';

import { formatComment } from '@/utils/comment';

import banStreamImg from '@/images/ban-stream.png';
import emergencyImg from '@/images/emergency.png';

type Props = {
  streamMode: keyof typeof streamModeList;
  comment: string;
  commentCrop: number;
};

export const CommentLayer = ({ streamMode, comment, commentCrop }: Props) => {
  let y = 101;
  const attrs = {
    // y: version === '2' ? 137 : 103, // ver3.0だと少し下
    x: 1220,
    fontSize: 24,
    align: 'left',
    lineHeight: 1.5,
    verticalAlign: 'top',
    wrap: 'char',
    width: 380,
    height: 770 - commentCrop,
  };
  const commentData = formatComment({ comment: comment });
  const commentElement = (
    <Group x={0} y={0} clipY={y + 9} clipX={0} clipWidth={1600} clipHeight={620 - commentCrop}>
      {commentData.map(([_name, msg], i) => {
        const isMember = /^[\!！]/.test(_name);
        const name = _name.replace(/^[\!！]/, '');
        const str = `${name.replace('[___EMPTY___]', '')}：${msg.replace('[___EMPTY___]', '')}`;
        const text = str === '：' ? '' : str;
        // TODO: 行の管理をやめて、テキストフィールドに入力された行をそのまま描画した方が現実的かも
        const length = [...text]
          .map((s) => {
            if (/[!?'/]/.test(s)) {
              return 0.21;
            }

            return /^[\x20-\x7e]*$/.test(s) ? 0.5 : 1;
          })
          .reduce((p, c) => p + c, 0);

        y += attrs.fontSize * attrs.lineHeight;

        const node = (
          <Group y={-40} key={i}>
            <Text y={y} {...attrs} text={text} strokeWidth={6} stroke="#000" lineJoin="round" />
            <Text y={y} {...attrs} text={text} fill="#fff" stroke="#fff" strokeWidth={1} />
            {isMember ? (
              <Text y={y} {...attrs} text={name} fill="#2ba640" stroke="#2ba640" strokeWidth={1} />
            ) : null}
          </Group>
        );

        y += Math.floor(length / 16.25) * (attrs.fontSize * attrs.lineHeight);

        return node;
      })}
    </Group>
  );

  switch (streamMode) {
    case 'restricted':
      return (
        <Image image={createImage({ src: banStreamImg })} x={0} y={0} width={1600} height={900} />
      );

    case 'emergency':
      return (
        <>
          {commentElement}
          <Image image={createImage({ src: emergencyImg })} x={0} y={0} width={1600} height={900} />
        </>
      );

    default:
      return commentElement;
  }
};
