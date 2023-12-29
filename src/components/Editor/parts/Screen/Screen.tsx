import React from 'react';
import { Image, Layer, Stage } from 'react-konva';

import { baseImgSrc, maskImgSrc, streamModeList } from '@/contants/dataset';

import styles from '@/components/Editor/parts/Screen/Screen.module.scss';
import { createImage } from '@/components/Editor/parts/Screen/create-image';
import {
  BlindfoldLayer,
  CommentLayer,
  MainImageLayer,
  NameLayer,
  OriginalImageLayer,
  RibbonLayer,
  TelopLayer,
  TimeLayer,
} from '@/components/Editor/parts/Screen/parts';

import cursorImg from '@/images/cursor.png';

const OtherLayer = ({ src, draggable }: { src: string; draggable?: boolean }) => {
  return (
    <Image
      image={createImage({ src })}
      x={0}
      y={0}
      width={1600}
      height={900}
      draggable={draggable}
    />
  );
};

type Props = {
  isMasked: boolean;
  useBlindfold: boolean;
  comment: string;
  commentCrop: number;
  streamMode: keyof typeof streamModeList;
  timeText: string;
  kaichoImgSrc: string;
  mainImgSrc: string;
  ribbonText: string;
  commentEdgeColor: string;
  commentColor: string;
  commentSize: number;
  useOriginal: boolean;
  originalImgSrc: string;
  originalImgWidth: number;
  originalImgHeight: number;
  originalImgBaseX: number;
  originalImgBaseY: number;
  originalImgX: number;
  originalImgY: number;
  originalImgScale: number;
  nameText: string;
  blindfold: { x: number; y: number; width: number; height: number };
  telopText: string;
  version: keyof typeof maskImgSrc;
};

export const Screen = ({
  isMasked,
  comment,
  commentCrop,
  streamMode,
  timeText,
  kaichoImgSrc,
  mainImgSrc,
  ribbonText,
  commentEdgeColor,
  commentColor,
  commentSize,
  nameText,
  useOriginal,
  originalImgSrc,
  originalImgScale,
  originalImgWidth,
  originalImgHeight,
  originalImgBaseX,
  originalImgBaseY,
  originalImgX,
  originalImgY,
  useBlindfold,
  blindfold,
  telopText,
  version,
}: Props) => {
  const maskImageSrc = maskImgSrc[version];
  const baseBackgroundSrc = baseImgSrc[version];

  return (
    <div
      className={styles.canvas}
      id="canvas-wrapper"
      onContextMenu={(e) => {
        e.preventDefault();
        alert('書き出しボタンを押して保存してくださいねー！');
      }}
    >
      <Stage width={1600} height={900} className={styles.stage}>
        <Layer>
          <OtherLayer src={baseBackgroundSrc} />
          <MainImageLayer src={mainImgSrc} />
          {useOriginal && (
            <OriginalImageLayer
              src={originalImgSrc}
              x={originalImgBaseX + originalImgX}
              y={originalImgBaseY + originalImgY}
              width={originalImgWidth * originalImgScale}
              height={originalImgHeight * originalImgScale}
            />
          )}
          {isMasked && <OtherLayer src={maskImageSrc} />}
          {useBlindfold && (
            <BlindfoldLayer
              x={blindfold.x}
              y={blindfold.y}
              width={blindfold.width}
              height={blindfold.height}
            />
          )}
          <NameLayer text={nameText} />
          <CommentLayer streamMode={streamMode} comment={comment} commentCrop={commentCrop} />
          {streamMode === 'default' && <TimeLayer text={timeText} version={version} />}
          <OtherLayer src={kaichoImgSrc} />
          <RibbonLayer text={ribbonText} version={version} />
          <TelopLayer
            text={telopText}
            commentSize={commentSize}
            commentEdgeColor={commentEdgeColor}
            commentColor={commentColor}
          />
          <OtherLayer src={cursorImg} draggable={true} />
        </Layer>
      </Stage>
    </div>
  );
};
