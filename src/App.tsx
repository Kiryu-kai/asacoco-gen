import React, {useState} from 'react';
import {Layer, Text, Image, Line, Stage, Group} from 'react-konva';
import {Input} from './components/form-controls/Input';
import {Checkbox} from './components/form-controls/Checkbox';
import {Textarea} from './components/form-controls/Textarea';
import baseImg from './images/base.jpg';
import maskImg from './images/mask.png';
import ribbonImg from './images/ribbon.png';
import ribbonKusoZakoImg from './images/ribbon--kusozako.png';
import watame from './images/talents/tsunomaki-watame--gangimari.png';
import banStreamImg from './images/ban-stream.png';
import kaicho01 from './images/kaicho/01.png';
import styles from './App.module.scss';

const getImageObj = (img: string) => {
  const obj = new globalThis.Image();

  obj.src = img;

  return obj;
};

function App() {
  const [isMasked, setMask] = useState(false);
  const [isStreamable, setStreamable] = useState(true);
  const [ribbon, setRibbon] = useState('');
  const [text, setText] = useState('');
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
    Kaicho() {
      return <Image image={getImageObj(kaicho01)} x={0} y={0} width={1600} height={900} />;
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
        y: 130,
        x: 70,
        fontSize: 60,
        align: 'center',
        wrap: 'word',
        lineHeight: 1.4,
        verticalAlign: 'bottom',
        width: 1100,
        height: 690,
      };

      return (
        <Group>
          <Text
            {...attrs}
            lineJoin="round"
            stroke="#000"
            strokeWidth={13}
          />
          <Text
            {...attrs}
            fill="#fff"
            stroke="#fff"
            strokeWidth={3}
          />
        </Group>
      );
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.canvas}>
        <Stage width={1600} height={900} className={styles.stage}>
          <Layer>
            <parts.Base />
            <Image image={getImageObj(watame)} x={0} y={0} width={1024} height={1065} />
            {
              isMasked ? <parts.Mask /> : <></>
            }
            <parts.Comment />
            <parts.Kaicho />
            <parts.Ribbon />
            <parts.Telop />
          </Layer>
        </Stage>
      </div>

      <div className={styles.ui}>
        <p>
          <Input label="リボン" onChange={(e) => setRibbon(e.target.value)} value={ribbon} />
        </p>

        <p>
          <Checkbox label="マスク" onChange={() => setMask(!isMasked)} checked={isMasked} />
        </p>

        <p>
          <Checkbox label="生放送権限" onChange={() => setStreamable(!isStreamable)} checked={isStreamable} />
        </p>

        <p>
          <Textarea label="コメント" onChange={(e) => setComment(e.target.value)} value={comment} />
        </p>

        <p>
          <Textarea label="テロップ" onChange={(e) => setText(e.target.value)} value={text} />
        </p>
      </div>
    </div>
  );
}

export default App;
