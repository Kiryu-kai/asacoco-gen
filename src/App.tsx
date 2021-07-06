import React, {useState} from 'react';
import {Layer, Text, Image, Stage} from 'react-konva';
import baseImg from './images/base.jpg';
import ribbonImg from './images/ribbon.png';
import styles from './App.module.scss';

const getImageObj = (img: string) => {
  const obj = new globalThis.Image();

  obj.src = img;

  return obj;
};

function App() {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');
  const Base = () => <Image image={getImageObj(baseImg)} x={0} y={0} width={1600} height={900} />;
  const Ribbon = () => {
    if (checked) {
      return <Image image={getImageObj(ribbonImg)} x={44} y={100} width={892 / 3.2} height={542 / 3.2} />;
    }

    return <></>;
  };

  return (
    <div className={styles.container}>
      <Stage width={1600} height={900} className={styles.stage}>
        <Layer>
          <Base />
          <Ribbon />
          <Text
            text={text}
            y={130}
            x={70}
            fontSize={60}
            align="center"
            wrap="word"
            lineHeight={1.5}
            verticalAlign="bottom"
            strokeWidth={20}
            stroke="#000"
            lineJoin="round"
            width={1100}
            height={690}
          />
          <Text
            text={text}
            y={130}
            x={70}
            fontSize={60}
            align="center"
            wrap="word"
            lineHeight={1.5}
            verticalAlign="bottom"
            fill="#fff"
            stroke="#fff"
            width={1100}
            height={690}
          />
        </Layer>
      </Stage>

      <p>
        <label>
          <input type="checkbox" onChange={() => setChecked(!checked)} checked={checked} />
          速報
        </label>
      </p>

      <p>
        <label>
          テキスト
          <input onChange={(e) => setText(e.target.value)} value={text} />
        </label>
      </p>
    </div>
  );
}

export default App;
