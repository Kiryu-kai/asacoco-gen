import React from 'react';
import { Image } from 'react-konva';

import { createImage } from '@/components/Screen/create-image';

type Props = {
  src: string;
};

export const MainImageLayer = ({ src }: Props) => {
  if (src === '__NO_IMAGE__') {
    return <></>;
  }

  return <Image image={createImage({ src })} x={0} y={0} width={1600} height={900} />;
};
