import React, { useEffect, useState } from 'react';

import { shuffle } from 'lodash';

import { baseImgSrc, streamModeList, versionList } from '@/contants/dataset';

import styles from '@/components/Editor/Editor.module.scss';
import { Screen } from '@/components/Editor/parts/Screen/Screen';
import { InputComment } from '@/components/Editor/parts/form-controls/InputComment';
import { InputPositionAdjuster } from '@/components/Editor/parts/form-controls/InputPositionAdjuster';
import { InputTime } from '@/components/Editor/parts/form-controls/InputTime';
import { Input, Select, Textarea } from '@/components/Editor/parts/form-controls/parts';

// import baseImg from '../images/debug.png';
import { convertToCommentString } from '@/utils/comment';
import { kaicho } from '@/utils/kaicho-img-loader';
import { talents } from '@/utils/main-img-loader';
import { ribbons } from '@/utils/ribbon-img-loader';

import dummyImg from '@/images/dummy.png';

/** ランダムでメンバーシップに */
const defaultComments = [
  ['チュングス', '草'],
  ['紫龍組構成員', 'NEEEEEEEEE'],
  ['西成じじい', '草'],
  ['KAIGAINIKI', 'lol'],
  ['桐生会構成員', 'やっぱこれだよなぁ！'],
  ['社畜ニキ', 'くさァｗ'],
  ['人外ニキ', 'YABE'],
  ['ガチ変勢', '草'],
  ['ガンギマリあさココ常用者', 'あっ'],
  ['一般通過野うさぎ', 'やばいぺこ'],
  ['西成じじい', '草'],
  ['腕組み後方彼氏面', '愚か愚かｗ'],
  ['鉄砲玉', 'かちこみ草'],
  ['ガテ恋', 'それは草'],
  ['大葉ネキ', 'POI'],
  ['えりぃとねこ', 'FAQ'],
].map(([name, comment]) => {
  const isMember = Math.random() < 0.8;
  return [`${isMember ? '!' : ''}${name}`, comment];
});

export const Editor = () => {
  const [version, setVersion] = useState<keyof typeof baseImgSrc>('0');
  const [isMasked, setMask] = useState(true);
  const [useBlindfold, setUseBlindfold] = useState(false);
  const [blindfoldX, setBlindfoldX] = useState(0);
  const [blindfoldY, setBlindfoldY] = useState(0);
  const [blindfoldW, setBlindfoldW] = useState(0);
  const [blindfoldH, setBlindfoldH] = useState(0);
  const [streamMode, setStreamMode] = useState<keyof typeof streamModeList>('default');
  const [useOriginal, setUseOriginal] = useState(false);
  const [ribbonText, setRibbonText] = useState('');
  const [nameText, setNameText] = useState('');
  const [text, setText] = useState('好きなテロップ');
  const [timeText, setTimeText] = useState('00:00');
  const [comment, setComment] = useState(convertToCommentString(shuffle(defaultComments)));
  const [commentCrop, setCommentCrop] = useState(220);
  const [commentSize, setcommentSize] = useState(93);
  const [commentColor, setcommentColor] = useState('#ffffff');
  const [commentEdgeColor, setcommentEdgeColor] = useState('#000000');
  const [kaichoImgSrc, setKaichoImgSrc] = useState<string>(kaicho[0][1]);
  const [mainImgSrc, setMainImgSrc] = useState<string>(dummyImg);
  const [originalImgSrc, setOriginalImgSrc] = useState('');
  const [originalImgBaseY, setOriginalImgBaseY] = useState(0);
  const [originalImgBaseX, setOriginalImgBaseX] = useState(0);
  const [originalImgWidth, setOriginalImgWidth] = useState(0);
  const [originalImgHeight, setOriginalImgHeight] = useState(0);
  const [originalImgScale, setOriginalImgScale] = useState(1);
  const [originalImgYminmax, setOriginalImgYminmax] = useState<[number, number]>([-1, 1]);
  const [originalImgY, setOriginalImgY] = useState(0);
  const [originalImgXminmax, setOriginalImgXminmax] = useState<[number, number]>([-1, 1]);
  const [originalImgX, setOriginalImgX] = useState(0);

  const mainAreaPos = {
    x: 63,
    y: 111,
  };

  // TODO: ピッタリよりも半分刺さるくらいまで移動できるように調整するかも
  //       その場合は、InputPositionAdjusterのために
  //       minmax系の管理方法を分離しないといけない
  /**
   * 手持ちの画像を調整するための
   * @param _options - useStateで管理されている値のうち、setされてない値を受け取る
   */
  const originalImgUpdate = (_options: {
    scale?: number;
    naturalWidth?: number;
    naturalHeight?: number;
  }) => {
    const options = {
      scale: originalImgScale,
      naturalWidth: originalImgWidth,
      naturalHeight: originalImgHeight,
      ..._options,
    };
    const { scale, naturalWidth, naturalHeight } = options;
    // ベース座標
    // 0, 0 は 63, 111
    // 1125 * 696
    const width = (naturalWidth * scale) / 2;
    const height = (naturalHeight * scale) / 2;
    const baseX = mainAreaPos.x + 1125 / 2 - width;
    const baseY = mainAreaPos.y + 696 / 2 - height;
    const xMin = -1 * (1125 / 2) + width;
    const xMax = 1125 / 2 - width;
    const yMin = -1 * (696 / 2) + height;
    const yMax = 696 / 2 - height;

    setOriginalImgXminmax([0 < xMin ? xMax : xMin, xMax < 0 ? xMin : xMax]);
    setOriginalImgYminmax([0 < yMin ? yMax : yMin, yMax < 0 ? yMin : yMax]);
    setOriginalImgBaseX(baseX);
    setOriginalImgBaseY(baseY);
  };

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (!isEdited) {
      return;
    }

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [isEdited]);

  return (
    <div className={styles.container}>
      <Screen
        version={version}
        isMasked={isMasked}
        useBlindfold={useBlindfold}
        commentCrop={commentCrop}
        comment={comment}
        timeText={timeText}
        streamMode={streamMode}
        kaichoImgSrc={kaichoImgSrc}
        mainImgSrc={mainImgSrc}
        ribbonText={ribbonText}
        commentEdgeColor={commentEdgeColor}
        commentColor={commentColor}
        commentSize={commentSize}
        nameText={nameText}
        useOriginal={useOriginal}
        originalImgSrc={originalImgSrc}
        originalImgScale={originalImgScale}
        originalImgWidth={originalImgWidth}
        originalImgHeight={originalImgHeight}
        originalImgBaseX={originalImgBaseX}
        originalImgBaseY={originalImgBaseY}
        originalImgX={originalImgX}
        originalImgY={originalImgY}
        blindfold={{
          x: blindfoldX,
          y: blindfoldY,
          width: blindfoldW,
          height: blindfoldH,
        }}
        telopText={text}
      />

      <form
        className={styles.ui}
        onChange={() => {
          setIsEdited(true);
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p>
          <Select
            label="Ver"
            options={versionList}
            onChange={(e) => setVersion(e.target.value as keyof typeof baseImgSrc)}
            value={version}
          />
        </p>

        <p>
          <Select
            label="会長"
            options={kaicho}
            onChange={(e) => setKaichoImgSrc(e.target.value)}
            value={kaichoImgSrc}
          />
        </p>

        <p>
          <Select
            label="メイン画像"
            options={[
              ['選択してください', dummyImg],
              ['noimage - 画像なし', '__NO_IMAGE__'],
              ...talents,
            ]}
            onChange={(e) => setMainImgSrc(e.target.value)}
            value={mainImgSrc}
          />
        </p>

        <p>
          <Input
            label="手持ちの画像"
            type="checkbox"
            onChange={() => setUseOriginal(!useOriginal)}
            checked={useOriginal}
          />
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
                    const { TB, GB } = denominator;

                    if (TB <= blob.size) {
                      return 'TB';
                    }

                    if (GB <= blob.size) {
                      return 'GB';
                    }

                    return 'MB';
                  })();
                  const size = Math.floor((blob.size / denominator[unit]) * 100) / 100;

                  if (
                    !confirm(
                      `${limit}MB超えてんで！\nゲボデカサイズは動作が不安定になることがあります。本当に読み込みますか？（${size}${unit})`,
                    )
                  ) {
                    e.target.value = '';

                    return;
                  }
                }

                fileReader.onload = () => {
                  img.src = String(fileReader.result);
                  img.onload = () => {
                    const { naturalWidth, naturalHeight } = img;

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
            label={
              <span>
                スケール
                <br />
                （x{String(originalImgScale).padEnd(3, '.0')}）
              </span>
            }
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
          <InputPositionAdjuster
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
          <InputPositionAdjuster
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
          <Input
            label="範囲マスク"
            type="checkbox"
            onChange={() => setMask(!isMasked)}
            checked={isMasked}
          />
        </p>

        <p>
          <Input
            label="目隠し"
            type="checkbox"
            onChange={() => setUseBlindfold(!useBlindfold)}
            checked={useBlindfold}
          />
        </p>

        <p className={styles.ui__child} hidden={!useBlindfold}>
          <Input
            label="X座標"
            type="range"
            min={-440}
            max={300}
            onChange={(e) => setBlindfoldX(Number(e.target.value))}
            value={blindfoldX}
          />
        </p>

        <p className={styles.ui__child} hidden={!useBlindfold}>
          <Input
            label="Y座標"
            type="range"
            min={-100}
            max={300}
            onChange={(e) => setBlindfoldY(Number(e.target.value))}
            value={blindfoldY}
          />
        </p>

        <p className={styles.ui__child} hidden={!useBlindfold}>
          <Input
            label="幅"
            type="range"
            min={-50}
            max={200}
            onChange={(e) => setBlindfoldW(Number(e.target.value))}
            value={blindfoldW}
          />
        </p>

        <p className={styles.ui__child} hidden={!useBlindfold}>
          <Input
            label="高さ"
            type="range"
            min={-10}
            max={200}
            onChange={(e) => setBlindfoldH(Number(e.target.value))}
            value={blindfoldH}
          />
        </p>

        <p>
          <Input
            label="リボン"
            placeholder="クソザコ/速報/悲報"
            onChange={(e) => setRibbonText(e.target.value)}
            value={ribbonText}
            list="リボン"
          />
          <datalist id="リボン">
            {[...ribbons.map(([label]) => label)].map((value) => (
              <option value={value} key={value} />
            ))}
          </datalist>
        </p>

        {Object.entries(streamModeList).map(([key, value]) => (
          <p key={key}>
            <Input
              label={value}
              type="radio"
              name="streamMode"
              onChange={() => setStreamMode(key as keyof typeof streamModeList)}
              checked={streamMode === key}
            />
          </p>
        ))}

        {streamMode === 'default' && <InputTime timeText={timeText} setTimeText={setTimeText} />}

        {streamMode !== 'restricted' && (
          <InputComment
            comment={comment}
            setComment={setComment}
            commentCrop={commentCrop}
            setCommentCrop={setCommentCrop}
          />
        )}

        <p>
          <Textarea
            label="肩書き・名前"
            placeholder={'「畜生ひつじ」こと\n角巻わため氏'}
            note={[
              '肩書きと名前は改行で区切ってください',
              '年齢は最後にかっこ書きで記述してください',
            ]}
            onChange={(e) => setNameText(e.target.value)}
            value={nameText}
          />
        </p>

        <p>
          <Textarea label="テロップ" onChange={(e) => setText(e.target.value)} value={text} />
        </p>

        <p>
          <Input
            label="文字サイズ"
            type="range"
            min="63"
            max="123"
            step="10"
            onChange={(e) => setcommentSize(Number(e.target.value))}
            value={commentSize}
          />
        </p>

        <p>
          <Input
            label="文字色"
            type="color"
            onChange={(e) => setcommentColor(e.target.value)}
            value={commentColor}
          />
        </p>

        <p>
          <Input
            label="縁色"
            type="color"
            onChange={(e) => setcommentEdgeColor(e.target.value)}
            value={commentEdgeColor}
          />
        </p>
      </form>
    </div>
  );
};
