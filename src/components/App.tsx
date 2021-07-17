import React, {useState, useEffect} from 'react';
import {Layer, Text, Image, Rect, Stage, Group} from 'react-konva';
import {Input} from './form-controls/Input';
import {Textarea} from './form-controls/Textarea';
import {Select} from './form-controls/Select';
import cursorImg from '../images/cursor.png';
import dummyImg from '../images/dummy.png';
import liveImg from '../images/live.png';
// import baseImg from '../images/debug.png';
import baseImg from '../images/base.png';
import base2Img from '../images/base--2.png';
import base3Img from '../images/base--3.png';
import basepekoImg from '../images/base--peko.png';
import baseAntiImg from '../images/base--anti.png';
import maskImg from '../images/mask.png';
import mask2Img from '../images/mask--2.png';
import mask3Img from '../images/mask--3.png';
import maskpekoImg from '../images/mask--peko.png';
import maskAntiImg from '../images/mask--anti.png';
import ribbonImg from '../images/ribbon.png';
import ribbonNewImg from '../images/ribbon--new.png';
import ribbonKusoZakoImg from '../images/ribbon--kusozako.png';
import ribbonKusoDasaImg from '../images/ribbon--kusodasa.png';
import ribbonGeboKawaImg from '../images/ribbon--gebokawa.png';
import ribbonGeboKawa2Img from '../images/ribbon--gebokawa2.png';
import ribbonGachikoiImg from '../images/ribbon--gachikoi.png';
import ribbonGachikoi2Img from '../images/ribbon--gachikoi2.png';
import ribbonOmedeteiImg from '../images/ribbon--omedetei.png';
import ribbonDetawaneImg from '../images/ribbon--detawane.png';
import ribbonDekapaiImg from '../images/ribbon--dekapai.png';
import ribbonArkImg from '../images/ribbon--ark.png';
import ribbonAntiNewImg from '../images/ribbon--anti-new.png';
import {talents} from '../utils/main-img-loader';
import {kaicho} from '../utils/kaicho-img-loader';
import banStreamImg from '../images/ban-stream.png';
import emergencyImg from '../images/emergency.png';
import styles from './App.module.scss';
import {PositionAdjuster} from './form-controls/PositionAdjuster';

// TODO: コンポーネントごとにファイルわけないと、そろそろさすがにやばいにぇ…

const getImageObj = (img: string) => {
  const obj = new globalThis.Image();

  obj.src = img;

  return obj;
};
const streamModeList = {
  default: '通常',
  emergency: '緊急速報',
  restricted: '生放送権限剥奪',
};
const baseImgSrc = {
  '0': baseImg,
  '1': base2Img,
  '2': base3Img,
  peko: basepekoImg,
  anti: baseAntiImg,
};
const maskImgSrc = {
  '0': maskImg,
  '1': mask2Img,
  '2': mask3Img,
  peko: maskpekoImg,
  anti: maskAntiImg,
};
const versionList: [string, keyof typeof baseImgSrc][] = [
  ['1.0', '0'],
  ['2.0', '1'],
  ['3.0', '2'],
  ['PekoNews!', 'peko'],
  ['あさアンチLIVE', 'anti'],
  // ['1.0', base3Img],
];
const mainAreaPos = {
  x: 63,
  y: 111,
};
const watchNow = (() => {
  let key = -1;

  return (isStart: boolean, callback: (x: string) => void) => {
    clearInterval(key);

    if (isStart) {
      key = window.setInterval(() => {
        const date = new Date();

        callback(`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`);
      }, 1000);
    }
  };
})();

function App() {
  const [version, setVersion] = useState<keyof typeof baseImgSrc>('0');
  const [isMasked, setMask] = useState(true);
  const [useBlindfold, setUseBlindfold] = useState(false);
  const [blindfoldX, setBlindfoldX] = useState(0);
  const [blindfoldY, setBlindfoldY] = useState(0);
  const [blindfoldW, setBlindfoldW] = useState(0);
  const [blindfoldH, setBlindfoldH] = useState(0);
  const [streamMode, setStreamMode] = useState<keyof typeof streamModeList>('default');
  const [useOriginal, setUseOriginal] = useState(false);
  const [ribbon, setRibbon] = useState('');
  const [nameText, setNameText] = useState('');
  const [text, setText] = useState('好きなテロップ');
  const [time, setTime] = useState('00:00');
  const [useNow, setUseNow] = useState(true);
  const [comment, setComment] = useState(`
  チュングス：草
  紫龍組構成員：NEEEEEEEEE
  西成じじい：草
  KAIGAINIKI：lol
  桐生会構成員：メンバーシップまだですか
  西成じじい：草
  人外ニキ：YABE
  ガチ変勢：草
  ガンギマリあさココ常用者：あつ
  一般通過野うさぎ：やばいぺこ
  西成じじい：草

  `.trim().replace(/^\s+/gm, ''));
  const [commentClip, setCommentClip] = useState(0);
  const [comentSize, setComentSize] = useState(93);
  const [comentColor, setComentColor] = useState('#ffffff');
  const [comentEdgeColor, setComentEdgeColor] = useState('#000000');
  const [kaichoImgSrc, setKaichoImgSrc] = useState<string>(kaicho[0][1]);
  const [mainImgSrc, setMainImgSrc] = useState<string>(dummyImg);
  const [originalImgSrc, setOriginalImgSrc] = useState('');
  const [originalImgStartX, setOriginalImgStartX] = useState(mainAreaPos.x); // TODO: なんでStateにしたんだっけにぇ…
  const [originalImgStartY, setOriginalImgStartY] = useState(mainAreaPos.y); // TODO: わすれちゃったにぇ…
  const [originalImgBaseY, setOriginalImgBaseY] = useState(0);
  const [originalImgBaseX, setOriginalImgBaseX] = useState(0);
  const [originalImgWidth, setOriginalImgWidth] = useState(0);
  const [originalImgHeight, setOriginalImgHeight] = useState(0);
  const [originalImgScale, setOriginalImgScale] = useState(1);
  const [originalImgYminmax, setOriginalImgYminmax] = useState<[number, number]>([-1, 1]);
  const [originalImgY, setOriginalImgY] = useState(0);
  const [originalImgXminmax, setOriginalImgXminmax] = useState<[number, number]>([-1, 1]);
  const [originalImgX, setOriginalImgX] = useState(0);
  const [emit, setEmit] = useState('');
  const [agree, setAgree] = useState(false);
  const parts = {
    Base() {
      return <Image image={getImageObj(baseImgSrc[version])} x={0} y={0} width={1600} height={900} />;
    },
    Mask() {
      return <Image image={getImageObj(maskImgSrc[version])} x={0} y={0} width={1600} height={900} />;
    },
    Comment() {
      const attrs = {
        text: comment.trim(),
        // y: version === '2' ? 137 : 103, // ver3.0だと少し下
        y: 103,
        x: 1220,
        fontSize: 24,
        align: 'left',
        wrap: 'word',
        lineHeight: 1.5,
        verticalAlign: 'top',
        width: 380,
        height: 500 + commentClip,
      };
      const commentElement = (
        <Group
          x={0}
          y={0}
          clipY={attrs.y + 9}
          clipX={0}
          clipWidth={1600}
          clipHeight={400 + commentClip}
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
        </Group>
      );

      switch (streamMode) {
        case 'restricted':
          return (
            <Image image={getImageObj(banStreamImg)} x={0} y={0} width={1600} height={900} />
          );

        case 'emergency':
          return (
            <>
              {commentElement}
              <Image image={getImageObj(emergencyImg)} x={0} y={0} width={1600} height={900} />
            </>
          );

        default:
          return commentElement;
      }
    },
    Time() {
      const text = time.trim();
      const attrs = {
        text,
        y: 16,
        x: 1358,
        fontSize: 100,
        fontFamily: '"Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
        align: 'left',
        verticalAlign: 'top',
        width: 380,
        height: 500,
      };

      return (
        (
          streamMode === 'default' &&
          text
        ) ?
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
      return (
        mainImgSrc !== '__NO_IMAGE__' ?
        <Image image={getImageObj(mainImgSrc)} x={0} y={0} width={1600} height={900} /> :
        <></>
      );
    },
    Original() {
      return (
        originalImgSrc && useOriginal ?
        <Image
          image={getImageObj(originalImgSrc)}
          x={originalImgBaseX + originalImgX}
          y={originalImgBaseY + originalImgY}
          width={originalImgWidth * originalImgScale}
          height={originalImgHeight * originalImgScale}
        /> :
        <></>
      );
    },
    Blindfold() {
      return <Rect
        x={504 + blindfoldX}
        y={296 + blindfoldY}
        fill="#000"
        width={200 + blindfoldW}
        height={30 + blindfoldH}
      />;
    },
    Name() {
      const [_title, ..._name] = nameText.replace(/ー/g, '｜').trim().split('\n');
      const name = (_name.length ? _name.join('') : _title).replace(/(（|\().*$/, '');
      const title = _name.length ? _title : '';
      const nameAttr = {
        text: [...name].join('\n'),
        y: name.length < 8 ? 240 : 180,
        x: 1005,
        fontSize: 69,
        align: 'center',
        wrap: 'word',
        lineHeight: 1,
        verticalAlign: 'top',
        scaleY: (() => {
          switch (name.length) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
              return 0.9;

            case 9:
              return 0.8;

            case 10:
              return 0.7;

            case 11:
              return 0.6;

            default:
              return 0.5;
          }
        })(),
      };
      const titleAttr = {
        text: [...title.replace(/「/g, '￢').replace(/」/g, '∟')].join('\n'),
        y: 162,
        x: 1098,
        fontSize: 48,
        align: 'center',
        wrap: 'word',
        lineHeight: 1,
        verticalAlign: 'top',
        height: 670,
        scaleY: 0.9,
      };

      return (
        <Group>
          {
            title ?
            (
              <>
                <Text
                  {...titleAttr}
                  lineJoin="round"
                  stroke="#000"
                  strokeWidth={14}
                />
                <Text
                  {...titleAttr}
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth={3}
                />
              </>
            ) :
            <></>
          }
          <Text
            {...nameAttr}
            lineJoin="round"
            stroke="#000"
            strokeWidth={18}
          />
          <Text
            {...nameAttr}
            fill="#fff"
            stroke="#fff"
            strokeWidth={3}
          />
        </Group>
      );
    },
    Ribbon() {
      if (ribbon) {
        const value = ribbon.trim();
        const [img, text] = (() => {
          if (/^new$/i.test(value)) {
            return [ribbonNewImg, ''];
          }

          if (/^(クソザコ|くそざこ|ｸｿｻﾞｺ)$/.test(value)) {
            return [ribbonKusoZakoImg, ''];
          }

          if (/^(クソダサ|くそださ|ｸｿﾀﾞｻ)$/.test(value)) {
            return [ribbonKusoDasaImg, ''];
          }

          if (/^(ゲボカワ|ｹﾞﾎﾞｶﾜ)$/.test(value)) {
            return [ribbonGeboKawaImg, ''];
          }

          if ('げぼかわ' === value) {
            return [ribbonGeboKawa2Img, ''];
          }

          if (/^(がちこい|ガチコイ|ｶﾞﾁｺｲ)$/.test(value)) {
            return [ribbonGachikoiImg, ''];
          }

          if ('ガチこい' === value) {
            return [ribbonGachikoi2Img, ''];
          }

          if ('でたわね' === value) {
            return [ribbonDetawaneImg, ''];
          }

          if ('おめでてい' === value) {
            return [ribbonOmedeteiImg, ''];
          }

          if ('でかパイ' === value) {
            return [ribbonDekapaiImg, ''];
          }

          if (/^ark$/i.test(value)) {
            return [ribbonArkImg, ''];
          }

          if (/^newアンチ$/i.test(value)) {
            return [ribbonAntiNewImg, ''];
          }

          return [ribbonImg, value];
        })();

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
        y: 120,
        x: 84,
        fontSize: comentSize,
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
          <Text
            {...attrs}
            lineJoin="round"
            stroke={comentEdgeColor}
            strokeWidth={17}
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

  // TODO: ピッタリよりも半分刺さるくらいまで移動できるように調整するかも
  //       その場合は、PositionAdjusterのために
  //       minmax系の管理方法を分離しないといけない
  /**
   * 手持ちの画像を調整するための
   * @param _options - useStateで管理されている値のうち、setされてない値を受け取る
   */
  const originalImgUpdate = (_options: {
    scale?: number,
    naturalWidth?: number,
    naturalHeight?: number,
  }) => {
    const options = {
      scale: originalImgScale,
      naturalWidth: originalImgWidth,
      naturalHeight: originalImgHeight,
      ..._options,
    };
    const {scale, naturalWidth, naturalHeight} = options;
    // ベース座標
    // 0, 0 は 63, 111
    // 1125 * 696
    const width = naturalWidth * scale / 2;
    const height = naturalHeight * scale / 2;
    const baseX = originalImgStartX + (1125 / 2) - width;
    const baseY = originalImgStartY + (696 / 2) - height;
    const xMin = -1 * (1125 / 2) + width;
    const xMax = (1125 / 2) - width;
    const yMin = -1 * (696 / 2) + height;
    const yMax = (696 / 2) - height;

    setOriginalImgXminmax([
      0 < xMin ? xMax : xMin,
      xMax < 0 ? xMin : xMax,
    ]);

    setOriginalImgYminmax([
      0 < yMin ? yMax : yMin,
      yMax < 0 ? yMin : yMax,
    ]);

    setOriginalImgBaseX(baseX);
    setOriginalImgBaseY(baseY);
  };

  useEffect(() => {
    // TODO: 何か編集があったらにしたい
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
  });

  return (
    <>
      <div className={styles.container}>
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
              <parts.Base />
              <parts.Main />
              <parts.Original />
              {
                isMasked ? <parts.Mask /> : <></>
              }
              {
                useBlindfold ? <parts.Blindfold /> : <></>
              }
              <parts.Name />
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
            <Select label="Ver" options={versionList} onChange={(e) => setVersion(e.target.value as keyof typeof baseImgSrc)} value={version} />
          </p>

          <p>
            <Select label="会長" options={kaicho} onChange={(e) => setKaichoImgSrc(e.target.value)} value={kaichoImgSrc} />
          </p>

          <p>
            <Select label="メイン画像" options={[
              ['選択してください', dummyImg],
              ['noimage - 画像なし', '__NO_IMAGE__'],
              ...talents,
            ]} onChange={(e) => setMainImgSrc(e.target.value)} value={mainImgSrc} />
          </p>

          <p>
            <Input label="手持ちの画像" type="checkbox" onChange={() => setUseOriginal(!useOriginal)} checked={useOriginal} />
          </p>

          <p className={styles.ui__child} hidden={!useOriginal}>
            <Input
              label="ファイル選択"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={(e) => {
                if (e.target.files) {
                  const fileReader = new FileReader();
                  const img = new globalThis.Image();
                  const [blob] = e.target.files;
                  const limit = 8;

                  if (1024 * 1024 * limit < blob.size) {
                    const denominator = {
                      MB: Math.pow(1024, 2),
                      GB: Math.pow(1024, 3),
                      TB: Math.pow(1024, 4),
                    };
                    const unit: 'MB' | 'GB' | 'TB' = (() => {
                      const {TB, GB} = denominator;

                      if (TB <= blob.size) {
                        return 'TB';
                      }

                      if (GB <= blob.size) {
                        return 'GB';
                      }

                      return 'MB';
                    })();
                    const size = Math.floor((blob.size / denominator[unit]) * 100) / 100;

                    if (!confirm(`${limit}MB超えてんで！\nゲボデカサイズは動作が不安定になることがあります。本当に読み込みますか？（${size}${unit})`)) {
                      e.target.value = '';

                      return;
                    }
                  }

                  fileReader.onload = () => {
                    img.src = String(fileReader.result);
                    img.onload = () => {
                      const {naturalWidth, naturalHeight} = img;

                      setOriginalImgWidth(img.naturalWidth);
                      setOriginalImgHeight(img.naturalHeight);

                      originalImgUpdate({
                        naturalWidth,
                        naturalHeight,
                      });
                    };
                    setOriginalImgSrc(String(fileReader.result));
                  };
                  fileReader.readAsDataURL(blob);
                }
              }}
            />
          </p>

          <p className={styles.ui__child} hidden={!useOriginal}>
            <Input
              label={(
                <span>
                  スケール<br />
                  （x{String(originalImgScale).padEnd(3, '.0')}）
                </span>
              )}
              type="range"
              min="0.1"
              max="2"
              step="0.01"
              onChange={(e) => {
                const scale = Number(e.target.value);

                setOriginalImgScale(scale);
                originalImgUpdate({
                  scale,
                });
              }}
              value={originalImgScale}
              disabled={!originalImgSrc}
            />
          </p>

          <p className={styles.ui__child} hidden={!useOriginal}>
            <Input
              label="X座標"
              type="range"
              min={originalImgXminmax[0]}
              max={originalImgXminmax[1]}
              onChange={(e) => setOriginalImgX(Number(e.target.value))}
              value={originalImgX}
              disabled={!originalImgSrc}
            />
          </p>

          <p className={styles.ui__child} hidden={!useOriginal}>
            <PositionAdjuster
              label="X軸整列"
              direction="x"
              btns={[
                {
                  label: '左',
                  onClick() {
                    setOriginalImgX(originalImgXminmax[0]);
                  },
                },
                {
                  label: '中心',
                  onClick() {
                    setOriginalImgX(0);
                  },
                },
                {
                  label: '右',
                  onClick() {
                    setOriginalImgX(originalImgXminmax[1]);
                  },
                },
              ]}
              disabled={!originalImgSrc}
            />
          </p>

          <p className={styles.ui__child} hidden={!useOriginal}>
            <Input
              label="Y座標"
              type="range"
              min={originalImgYminmax[0]}
              max={originalImgYminmax[1]}
              onChange={(e) => setOriginalImgY(Number(e.target.value))}
              value={originalImgY}
              disabled={!originalImgSrc}
            />
          </p>

          <p className={styles.ui__child} hidden={!useOriginal}>
            <PositionAdjuster
              label="Y軸整列"
              direction="y"
              btns={[
                {
                  label: '上',
                  onClick() {
                    setOriginalImgY(originalImgYminmax[0]);
                  },
                },
                {
                  label: '中心',
                  onClick() {
                    setOriginalImgY(0);
                  },
                },
                {
                  label: '下',
                  onClick() {
                    setOriginalImgY(originalImgYminmax[1]);
                  },
                },
              ]}
              disabled={!originalImgSrc}
            />
          </p>

          <p>
            <Input label="範囲マスク" type="checkbox" onChange={() => setMask(!isMasked)} checked={isMasked} />
          </p>

          <p>
            <Input label="目隠し" type="checkbox" onChange={() => setUseBlindfold(!useBlindfold)} checked={useBlindfold} />
          </p>

          <p className={styles.ui__child} hidden={!useBlindfold}>
            <Input label="X座標" type="range" min={-440} max={300} onChange={(e) => setBlindfoldX(Number(e.target.value))} value={blindfoldX} />
          </p>

          <p className={styles.ui__child} hidden={!useBlindfold}>
            <Input label="Y座標" type="range" min={-100} max={300} onChange={(e) => setBlindfoldY(Number(e.target.value))} value={blindfoldY} />
          </p>

          <p className={styles.ui__child} hidden={!useBlindfold}>
            <Input label="幅" type="range" min={-50} max={200} onChange={(e) => setBlindfoldW(Number(e.target.value))} value={blindfoldW} />
          </p>

          <p className={styles.ui__child} hidden={!useBlindfold}>
            <Input label="高さ" type="range" min={-10} max={200} onChange={(e) => setBlindfoldH(Number(e.target.value))} value={blindfoldH} />
          </p>

          <p>
            <Input
              label="リボン"
              placeholder="クソザコ/速報/悲報"
              onChange={(e) => setRibbon(e.target.value)}
              value={ribbon}
              list="リボン"
            />
            <datalist id="リボン">
              {
                [
                  'NEW',
                  'クソザコ',
                  'クソダサ',
                  'ゲボカワ',
                  'げぼかわ',
                  'ガチコイ',
                  'ガチこい',
                  'でたわね',
                  'おめでてい',
                  'でかパイ', // https://www.youtube.com/watch?v=fAoNvVCRQ60
                  'ARK', // https://www.youtube.com/watch?v=fAoNvVCRQ60
                  'NEWアンチ', // https://www.youtube.com/watch?v=fAoNvVCRQ60
                ].map((value) => <option value={value} key={value} />)
              }
            </datalist>
          </p>

          {
            Object.entries(streamModeList).map(([key, value]) => (
              <p key={key}>
                <Input
                  label={value}
                  type="radio"
                  name="streamMode"
                  onChange={() => setStreamMode(key as keyof typeof streamModeList)}
                  checked={streamMode === key}
                />
              </p>
            ))
          }

          <p className={styles.ui__child} hidden={streamMode !== 'default'}>
            <Input label="現在時刻" type="checkbox" onChange={(() => {
              const run = (isStart: boolean) => watchNow(isStart, (val: string) => setTime(val));

              run(useNow);

              return () => {
                setUseNow(!useNow);
                run(!useNow);
              };
            })()} checked={useNow} />
          </p>

          <p className={styles.ui__child} hidden={streamMode !== 'default'}>
            <Input label="時間" type="time" onChange={(e) => setTime(e.target.value)} value={time} disabled={useNow} />
          </p>

          <p className={styles.ui__child} hidden={streamMode === 'restricted'}>
            <Textarea label="コメント" rows={10} onChange={(e) => setComment(e.target.value)} value={comment} />
          </p>

          <p className={styles.ui__child} hidden={streamMode === 'restricted'}>
            <Input
              label="コメントクリップ"
              type="range"
              min={-80}
              step={10}
              max={220}
              onChange={(e) => setCommentClip(Number(e.target.value))}
              value={commentClip}
            />
          </p>

          <p>
            <Textarea
              label="肩書き・名前"
              placeholder={'「畜生ひつじ」こと\n角巻わため氏'}
              onChange={(e) => setNameText(e.target.value)}
              value={nameText}
            />
          </p>

          <p>
            <Textarea label="テロップ" onChange={(e) => setText(e.target.value)} value={text} />
          </p>

          <p>
            <Input label="文字サイズ" type="range" min="63" max="123" step="10" onChange={(e) => setComentSize(Number(e.target.value))} value={comentSize} />
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
        <p className={styles.agree}>
          <label className={styles.agree__wrap}>
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className={styles.agree__input}
            />
            <span className={styles.agree__label}><a href="#guidelines">お願いと免責事項</a>に同意し、所属タレントやあなたの作品を見た方への心情に配慮すること誓います。</span>
          </label>
        </p>

        {
          emit ?
          <div hidden={!agree}>
            <h2 className={styles.download__h2}>ダウンロード</h2>
            <p className={styles.download__note}>画像を右クリック、またはホールドで保存してください。</p>
            <p className={styles.download__imgWrap}>
              <img src={emit} alt="作った画像" className={styles.download__img} />
            </p>
          </div> :
          <></>
        }

        <p className={styles.download__btnWrap}>
          <button
            onClick={() => {
              setEmit(document.querySelector<HTMLCanvasElement>('#canvas-wrapper canvas')!.toDataURL());
            }}
            className={styles.download__btn}
            disabled={!agree}
          >画像として書き出し</button>
        </p>
      </div>
    </>
  );
}

export default App;
