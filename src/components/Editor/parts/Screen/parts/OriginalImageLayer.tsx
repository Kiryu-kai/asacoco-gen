import React from 'react';
import { Image } from 'react-konva';

import { createImage } from '@/components/Editor/parts/Screen/create-image';

type Props = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const OriginalImageLayer = ({ src, x, y, width, height }: Props) => {
  if (src === '') {
    return <></>;
  }

  return <Image image={createImage({ src })} x={x} y={y} width={width} height={height} />;
};
