import React from 'react';
import { Image, Text } from 'react-konva';

import { createImage } from '@/components/Editor/parts/Screen/create-image';

import { ribbons } from '@/utils/ribbon-img-loader';

import ribbonLGTMImgSrc from '@/images/ribbon--lgtm.png';
import ribbonImg from '@/images/ribbon.png';

const getSrc = ({ keyword }: { keyword: string }) => {
  if (/lgtm/i.test(keyword)) {
    return ribbonLGTMImgSrc;
  }

  return ribbons.find(([name, _, callback]) => {
    if (callback) {
      return callback(keyword);
    }

    return name === keyword;
  })?.[1];
};

type RibbonProps = { src: string };

const Ribbon = ({ src }: RibbonProps) => {
  return <Image image={createImage({ src })} x={44} y={100} width={892 / 3.2} height={542 / 3.2} />;
};

type Props = { text: string };

export const RibbonLayer = ({ text }: Props) => {
  const trimedText = text.trim();

  if (trimedText === '') {
    return <></>;
  }

  const src = getSrc({ keyword: trimedText });

  if (src) {
    return <Ribbon src={src} />;
  }

  return (
    <>
      <Ribbon src={ribbonImg} />
      <Text
        text={trimedText}
        y={112}
        x={40}
        fontSize={86}
        align="center"
        wrap="word"
        lineHeight={1.5}
        verticalAlign="bottom"
        fill="#fff"
        stroke="#fff"
        width={892 / 3.2}
      />
    </>
  );
};
