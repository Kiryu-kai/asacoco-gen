import React from 'react';
import { Rect } from 'react-konva';

type Props = { x: number; y: number; width: number; height: number };

export const BlindfoldLayer = ({ x, y, width, height }: Props) => {
  return <Rect x={504 + x} y={296 + y} fill="#000" width={200 + width} height={30 + height} />;
};
