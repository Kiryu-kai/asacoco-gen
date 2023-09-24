import React from 'react';
import { Group, Text } from 'react-konva';

type Props = {
  text: string;
  commentSize: number;
  commentEdgeColor: string;
  commentColor: string;
};

export const TelopLayer = ({ text, commentSize, commentEdgeColor, commentColor }: Props) => {
  const attrs = {
    text: text.trim(),
    y: 120,
    x: 84,
    fontSize: commentSize,
    align: 'center',
    wrap: 'word',
    lineHeight: 1.2,
    verticalAlign: 'bottom',
    width: 1200,
    height: 690,
    scaleX: 0.9,
  };

  return (
    <Group>
      <Text {...attrs} lineJoin="round" stroke={commentEdgeColor} strokeWidth={17} />
      <Text {...attrs} fill={commentColor} stroke={commentColor} strokeWidth={3} />
    </Group>
  );
};
