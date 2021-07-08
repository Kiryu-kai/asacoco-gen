import React, {useState} from 'react';
import {Layer, Text, Image, Line, Stage, Group} from 'react-konva';
import {Input} from './components/form-controls/Input';
import {Textarea} from './components/form-controls/Textarea';
import {Select} from './components/form-controls/Select';
import dummyImg from './images/dummy.png';
import liveImg from './images/live.png';
import transparentImg from './images/transparent.png';
import baseImg from './images/base.jpg';
import maskImg from './images/mask.png';
import ribbonImg from './images/ribbon.png';
import ribbonKusoZakoImg from './images/ribbon--kusozako.png';
import {talents} from './utils/main-img-loader';
import banStreamImg from './images/ban-stream.png';
import kaicho01 from './images/kaicho/01.png';
import styles from './App.module.scss';

const getImageObj = (img: string) => {
  const obj = new globalThis.Image();

  obj.src = img;

  return obj;
};

function App() {
  const [isMasked, setMask] = useState(true);
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
  const [mainImgSrc, setMainImgSrc] = useState<string | null>(dummyImg);
  const parts = {
    Base() {
      return <Image image={getImageObj(baseImg)} x={0} y={0} width={1600} height={900} />;
    },
    Mask() {
      return <Image image={getImageObj(maskImg)} x={0} y={0} width={1600} height={900} />;
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
      return <Image image={getImageObj(kaicho01)} x={0} y={0} width={1600} height={900} />;
    },
    Main() {
      return (
        mainImgSrc ?
        <Image image={getImageObj(mainImgSrc)} x={0} y={0} width={1600} height={900} /> :
        <></>
      );
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
    <div className={styles.container}>
      <div className={styles.bgSwitch}>
        <p className={styles.bgSwitch__item}>
          <button className={styles.bgSwitch__btn} onClick={() => document.body.dataset.color ='0'}>デフォルト</button>
        </p>
        <p className={styles.bgSwitch__item}>
          <button className={styles.bgSwitch__btn} onClick={() => document.body.dataset.color ='1'}>ダークブルー</button>
        </p>
        <p className={styles.bgSwitch__item}>
          <button className={styles.bgSwitch__btn} onClick={() => document.body.dataset.color ='2'}>ブラック</button>
        </p>
      </div>

      <div className={styles.canvas}>
        <Stage width={1600} height={900} className={styles.stage}>
          <Layer>
            <parts.Base />
            <parts.Main />
            {
              isMasked ? <parts.Mask /> : <></>
            }
            <parts.Comment />
            <parts.Time />
            <parts.Kaicho />
            <parts.Ribbon />
            <parts.Telop />
          </Layer>
        </Stage>
      </div>

      <div className={styles.ui}>
        <p>
          <Select label="メイン画像" options={[
            ['選択してください', dummyImg, true],
            ['transparent - 画像なし', transparentImg],
            ...talents,
          ]} onChange={(e) => setMainImgSrc(e.target.value)} value={mainImgSrc ?? ''} />
        </p>

        <p>
          <Input label="マスク" type="checkbox" onChange={() => setMask(!isMasked)} checked={isMasked} />
        </p>

        <p>
          <Input label="リボン" onChange={(e) => setRibbon(e.target.value)} value={ribbon} />
        </p>

        <p>
          <Input label="時間" type="time" onChange={(e) => setTime(e.target.value)} value={time} />
        </p>

        <p>
          <Input label="生放送権限" type="checkbox" onChange={() => setStreamable(!isStreamable)} checked={isStreamable} />
        </p>

        <p>
          <Textarea label="コメント" rows={10} onChange={(e) => setComment(e.target.value)} value={comment} disabled={isStreamable} />
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
  );
}

export default App;
