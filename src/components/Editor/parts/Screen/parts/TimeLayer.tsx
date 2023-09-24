import React from 'react';
import { Group, Image, Text } from 'react-konva';

import { createImage } from '@/components/Editor/parts/Screen/create-image';

import liveImg from '@/images/live.png';

type Props = { text: string };

export const TimeLayer = ({ text }: Props) => {
  if (text === '') {
    return <></>;
  }

  const attrs = {
    text,
    y: 16,
    x: 1358,
    fontSize: 100,
    fontFamily:
      '"Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    align: 'left',
    verticalAlign: 'top',
    width: 380,
    height: 500,
  };

  return (
    <Group>
      <Image image={createImage({ src: liveImg })} x={0} y={0} width={1600} height={900} />
      <Text {...attrs} strokeWidth={6} stroke="#000" lineJoin="round" />
      <Text {...attrs} fill="#fff" stroke="#fff" strokeWidth={1} />
    </Group>
  );
};
