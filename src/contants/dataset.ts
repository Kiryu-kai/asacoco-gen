import base2Img from '@/images/base--2.png';
import base3Img from '@/images/base--3.png';
import baseAntiImg from '@/images/base--anti.png';
import basepekoImg from '@/images/base--peko.png';
import baseImg from '@/images/base.png';
import mask2Img from '@/images/mask--2.png';
import mask3Img from '@/images/mask--3.png';
import maskAntiImg from '@/images/mask--anti.png';
import maskpekoImg from '@/images/mask--peko.png';
import maskImg from '@/images/mask.png';

export const streamModeList = {
  default: '通常',
  emergency: '緊急速報',
  restricted: '生放送権限剥奪',
};

export const baseImgSrc = {
  '0': baseImg,
  '1': base2Img,
  '2': base3Img,
  peko: basepekoImg,
  anti: baseAntiImg,
};

export const maskImgSrc: typeof baseImgSrc = {
  '0': maskImg,
  '1': mask2Img,
  '2': mask3Img,
  peko: maskpekoImg,
  anti: maskAntiImg,
};

export const versionList: [string, keyof typeof baseImgSrc][] = [
  ['1.0', '0'],
  ['2.0', '1'],
  ['3.0', '2'],
  ['PekoNews!', 'peko'],
  ['あさアンチLIVE', 'anti'],
  // ['1.0', base3Img],
];
