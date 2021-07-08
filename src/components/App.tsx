import React, {useState} from 'react';
import {Layer, Text, Image, Rect, Stage, Group} from 'react-konva';
import {Input} from './form-controls/Input';
import {Textarea} from './form-controls/Textarea';
import {Select} from './form-controls/Select';
import cursorImg from '../images/cursor.png';
import dummyImg from '../images/dummy.png';
import liveImg from '../images/live.png';
import transparentImg from '../images/transparent.png';
import baseImg from '../images/base.png';
import base2Img from '../images/base--2.png';
import base3Img from '../images/base--3.png';
import maskImg from '../images/mask.png';
import mask2Img from '../images/mask--2.png';
import mask3Img from '../images/mask--3.png';
import ribbonImg from '../images/ribbon.png';
import ribbonKusoZakoImg from '../images/ribbon--kusozako.png';
import {talents} from '../utils/main-img-loader';
import banStreamImg from '../images/ban-stream.png';
import kaicho01 from '../images/kaicho/01.png';
import styles from './App.module.scss';

const getImageObj = (img: string) => {
  const obj = new globalThis.Image();

  obj.src = img;

  return obj;
};
const baseImgSrc = [
  baseImg,
  base2Img,
  base3Img,
];
const maskImgSrc = [
  maskImg,
  mask2Img,
  mask3Img,
];

function App() {
  const [version, setVersion] = useState('0');
  const [isMasked, setMask] = useState(true);
  const [useBlindfold, setUseBlindfold] = useState(false);
  const [blindfoldX, setBlindfoldX] = useState(0);
  const [blindfoldY, setBlindfoldY] = useState(0);
  const [blindfoldW, setBlindfoldW] = useState(0);
  const [blindfoldH, setBlindfoldH] = useState(0);
  const [isStreamable, setStreamable] = useState(true);
  const [ribbon, setRibbon] = useState('クソザコ');
  const [text, setText] = useState('好きなテロップ');
  const [time, setTime] = useState('06:04');
  const [comment, setComment] = useState(`
  チュングス：草
  西成じじい：草
  西成じじい：草
  西成じじい：草
  西成じじい：草
  西成じじい：草
  人外ニキ：YABE
  ガチ変勢：草
  ガンギマリあさココ常用者：あつ
  一般通過野うさぎ：やばいぺこ
  西成じじい：草

  `.trim().replace(/^\s+/gm, ''));
  const [comentSize, setComentSize] = useState(90);
  const [comentColor, setComentColor] = useState('#ffffff');
  const [comentEdgeColor, setComentEdgeColor] = useState('#000000');
  const [kaichoImgSrc, setKaichoImgSrc] = useState<string>(kaicho01);
  const [mainImgSrc, setMainImgSrc] = useState<string>(dummyImg);
  const [emit, setEmit] = useState('');
  const parts = {
    Base() {
      return <Image image={getImageObj(baseImgSrc[Number(version)])} x={0} y={0} width={1600} height={900} />;
    },
    Mask() {
      return <Image image={getImageObj(maskImgSrc[Number(version)])} x={0} y={0} width={1600} height={900} />;
    },
    Comment() {
      const attrs = {
        text: comment.trim(),
        y: 103,
        x: 1220,
        fontSize: 24,
        align: 'left',
        wrap: 'word',
        lineHeight: 1.5,
        verticalAlign: 'top',
        width: 380,
        height: 500,
      };

      return (
        isStreamable ?
        <Group
          x={0}
          y={0}
          clipY={112}
          clipX={0}
          clipWidth={1600}
          clipHeight={400}
        >
          <Text
            {...attrs}
            strokeWidth={6}
            stroke="#000"
            lineJoin="round"
          />
          <Text
            {...attrs}
            fill="#fff"
            stroke="#fff"
            strokeWidth={1}
          />
        </Group> :
        <Image image={getImageObj(banStreamImg)} x={0} y={0} width={1600} height={900} />
      );
    },
    Time() {
      const text = time.trim();
      const attrs = {
        text,
        y: 34,
        x: 1372,
        fontSize: 76,
        fontFamily: '"Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
        align: 'left',
        verticalAlign: 'top',
        width: 380,
        height: 500,
      };

      return (
        isStreamable && text ?
        <Group>
          <Image image={getImageObj(liveImg)} x={0} y={0} width={1600} height={900} />
          <Text
            {...attrs}
            strokeWidth={6}
            stroke="#000"
            lineJoin="round"
          />
          <Text
            {...attrs}
            fill="#fff"
            stroke="#fff"
            strokeWidth={1}
          />
        </Group> :
        <></>
      );
    },
    Kaicho() {
      return <Image image={getImageObj(kaichoImgSrc)} x={0} y={0} width={1600} height={900} />;
    },
    Main() {
      return <Image image={getImageObj(mainImgSrc)} x={0} y={0} width={1600} height={900} />;
    },
    blindfold() {
      return <Rect
        x={504 + blindfoldX}
        y={296 + blindfoldY}
        fill="#000"
        width={200 + blindfoldW}
        height={30 + blindfoldH}
      />;
    },
    Ribbon() {
      if (ribbon) {
        const value = ribbon.trim();
        const isKusozako = /^(クソザコ|くそざこ|ｸｿｻﾞｺ)$/.test(value);
        const img = isKusozako ? ribbonKusoZakoImg : ribbonImg;
        const text = isKusozako ? '' : value;

        return (
          <>
            <Image image={getImageObj(img)} x={44} y={100} width={892 / 3.2} height={542 / 3.2} />
            <Text
              text={text}
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
      }

      return <></>;
    },
    Telop() {
      const attrs = {
        text: text.trim(),
        y: 122,
        x: 70,
        fontSize: comentSize,
        align: 'center',
        wrap: 'word',
        lineHeight: 1.2,
        verticalAlign: 'bottom',
        width: 1100,
        height: 690,
      };

      return (
        <Group>
          <Text
            {...attrs}
            lineJoin="round"
            stroke={comentEdgeColor}
            strokeWidth={13}
          />
          <Text
            {...attrs}
            fill={comentColor}
            stroke={comentColor}
            strokeWidth={3}
          />
        </Group>
      );
    },
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.canvas} id="canvas-wrapper">
          <Stage width={1600} height={900} className={styles.stage}>
            <Layer>
              <parts.Base />
              <parts.Main />
              {
                isMasked ? <parts.Mask /> : <></>
              }
              {
                useBlindfold ? <parts.blindfold /> : <></>
              }
              <parts.Comment />
              <parts.Time />
              <parts.Kaicho />
              <parts.Ribbon />
              <parts.Telop />
              <Image image={getImageObj(cursorImg)} x={0} y={0} width={1600} height={900} draggable={true} />
            </Layer>
          </Stage>
        </div>

        <div className={styles.ui}>
          <p>
            <Select label="Ver" options={[
              ['1.0', '0'],
              ['2.0', '1'],
              ['3.0', '2'],
              // ['1.0', base3Img],
            ]} onChange={(e) => setVersion(e.target.value)} value={version} />
          </p>

          <p>
            <Select label="会長" options={[
              ['01 - ガンギマリ正面', kaichoImgSrc],
            ]} onChange={(e) => setKaichoImgSrc(e.target.value)} value={kaichoImgSrc} />
          </p>

          <p>
            <Select label="メイン画像" options={[
              ['選択してください', dummyImg],
              ['transparent - 画像なし', transparentImg],
              ...talents,
            ]} onChange={(e) => setMainImgSrc(e.target.value)} value={mainImgSrc} />
          </p>

          <p>
            <Input label="範囲マスク" type="checkbox" onChange={() => setMask(!isMasked)} checked={isMasked} />
          </p>

          <p>
            <Input label="目隠し" type="checkbox" onChange={() => setUseBlindfold(!useBlindfold)} checked={useBlindfold} />
          </p>

          <p hidden={!useBlindfold}>
            <Input label="目隠し（X）" type="number" onChange={(e) => setBlindfoldX(Number(e.target.value))} value={blindfoldX} />
          </p>

          <p hidden={!useBlindfold}>
            <Input label="目隠し（Y）" type="number" onChange={(e) => setBlindfoldY(Number(e.target.value))} value={blindfoldY} />
          </p>

          <p hidden={!useBlindfold}>
            <Input label="目隠し（W）" type="number" onChange={(e) => setBlindfoldW(Number(e.target.value))} value={blindfoldW} />
          </p>

          <p hidden={!useBlindfold}>
            <Input label="目隠し（H）" type="number" onChange={(e) => setBlindfoldH(Number(e.target.value))} value={blindfoldH} />
          </p>

          <p>
            <Input label="リボン" placeholder="クソザコ/速報/悲報" onChange={(e) => setRibbon(e.target.value)} value={ribbon} />
          </p>

          <p>
            <Input label="生放送権限" type="checkbox" onChange={() => setStreamable(!isStreamable)} checked={isStreamable} />
          </p>

          <p hidden={!isStreamable}>
            <Input label="時間" type="time" onChange={(e) => setTime(e.target.value)} value={time} />
          </p>

          <p hidden={!isStreamable}>
            <Textarea label="コメント" rows={10} onChange={(e) => setComment(e.target.value)} value={comment} />
          </p>

          <p>
            <Textarea label="テロップ" onChange={(e) => setText(e.target.value)} value={text} />
          </p>

          <p>
            <Input label="文字サイズ" type="range" min="60" max="120" step="10" onChange={(e) => setComentSize(Number(e.target.value))} value={comentSize} />
          </p>

          <p>
            <Input label="文字色" type="color" onChange={(e) => setComentColor(e.target.value)} value={comentColor} />
          </p>

          <p>
            <Input label="縁色" type="color" onChange={(e) => setComentEdgeColor(e.target.value)} value={comentEdgeColor} />
          </p>
        </div>
      </div>

      <div className={styles.download}>
        {
          emit ?
          <>
            <h2 className={styles.download__h2}>ダウンロード</h2>
            <p className={styles.download__note}>画像を右クリック、またはホールドで保存してください。</p>
            <p className={styles.download__imgWrap}>
              <img src={emit} alt="作った画像" className={styles.download__img} />
            </p>
          </> :
          <></>
        }
        <p className={styles.download__btnWrap}>
          <button onClick={() => {
            setEmit(document.querySelector<HTMLCanvasElement>('#canvas-wrapper canvas')!.toDataURL());
          }} className={styles.download__btn}>画像として書き出し</button>
        </p>
      </div>
    </>
  );
}

export default App;
