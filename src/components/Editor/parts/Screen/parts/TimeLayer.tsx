import React from 'react';
import { Group, Image, Text } from 'react-konva';

import { maskImgSrc } from '@/contants/dataset';

import { createImage } from '@/components/Editor/parts/Screen/create-image';

import liveMocoImg from '@/images/live--moco.png';
import liveImg from '@/images/live.png';

type Props = { text: string; version: keyof typeof maskImgSrc };

export const TimeLayer = ({ text, version }: Props) => {
  if (text === '') {
    return <></>;
  }

  const isMoco = version === 'moco';
  const color = isMoco ? '#000' : '#fff';
  const attrs = {
    text: isMoco ? text.replace(/^0/, '') : text,
    y: isMoco ? 9 : 16,
    x: isMoco ? 1300 : 1358,
    fontSize: 100,
    fontStyle: isMoco ? 'bold' : 'normal',
    fontFamily: isMoco
      ? '"Yu Gothic", "MS Gothic", "sans-serif"'
      : '"Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    align: 'left',
    verticalAlign: 'top',
    width: 380,
    height: 500,
  };

  return (
    <Group>
      <Image
        image={createImage({ src: isMoco ? liveMocoImg : liveImg })}
        x={0}
        y={0}
        width={1600}
        height={900}
      />
      <Text {...attrs} strokeWidth={6} stroke="#000" lineJoin="round" />
      <Text {...attrs} fill={color} stroke={color} strokeWidth={1} />
    </Group>
  );
};
