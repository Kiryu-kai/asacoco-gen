import ribbonAntiNewImg from '@/images/ribbon--anti-new.png';
import ribbonArkImg from '@/images/ribbon--ark.png';
import ribbonDekapaiImg from '@/images/ribbon--dekapai.png';
import ribbonDetawaneImg from '@/images/ribbon--detawane.png';
import ribbonGachikoi2Img from '@/images/ribbon--gachikoi2.png';
import ribbonGachikoiImg from '@/images/ribbon--gachikoi.png';
import ribbonGeboKawa2Img from '@/images/ribbon--gebokawa2.png';
import ribbonGeboKawaImg from '@/images/ribbon--gebokawa.png';
import ribbonKusoDasaImg from '@/images/ribbon--kusodasa.png';
import ribbonKusoZakoImg from '@/images/ribbon--kusozako.png';
import ribbonNewImg from '@/images/ribbon--new.png';
import ribbonOmedeteiImg from '@/images/ribbon--omedetei.png';

export const ribbons: ([string, string] | [string, string, (_: string) => boolean])[] = [
  ['NEW', ribbonNewImg, (value) => /^new$/i.test(value)],
  ['クソザコ', ribbonKusoZakoImg],
  ['クソダサ', ribbonKusoDasaImg],
  ['ゲボカワ', ribbonGeboKawaImg],
  ['げぼかわ', ribbonGeboKawa2Img],
  ['ガチコイ', ribbonGachikoiImg],
  ['ガチこい', ribbonGachikoi2Img],
  ['でたわね', ribbonDetawaneImg],
  ['おめでてい', ribbonOmedeteiImg],
  ['でかパイ', ribbonDekapaiImg], // https://www.youtube.com/watch?v=fAoNvVCRQ60
  ['ARK', ribbonArkImg, (value) => /^ark$/i.test(value)], // https://www.youtube.com/watch?v=fAoNvVCRQ60
  ['NEWアンチ', ribbonAntiNewImg, (value) => /^newアンチ$/i.test(value)], // https://www.youtube.com/watch?v=fAoNvVCRQ60
];
