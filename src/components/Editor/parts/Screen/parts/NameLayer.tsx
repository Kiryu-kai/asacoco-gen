import React from 'react';
import { Group, Text } from 'react-konva';

type Props = { text: string };

export const NameLayer = ({ text }: Props) => {
  const [name, age, title] = (() => {
    const [_title, ..._str] = text.replace(/ー/g, '｜').trim().split('\n');
    const _name = _str.join('');
    const parseName = (str: string) => {
      const ageIndexZen = str.lastIndexOf('（');
      const ageIndexHan = str.lastIndexOf('(');

      if (ageIndexZen === -1 && ageIndexHan === -1) {
        return [str, ''];
      }

      const ageIndex = ageIndexZen < ageIndexHan ? ageIndexHan : ageIndexZen;

      return [
        str.slice(0, ageIndex),
        `（${str
          .slice(ageIndex)
          .replace(/[^0-9０-９?？不詳非公開]/g, '')
          .replace(/[０-９]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
          })
          .replace(/？/g, '?')}）`,
      ];
    };

    if (!_name) {
      return [...parseName(_title), ''];
    }

    return [...parseName(_name), _title];
  })();

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
  const ageAttr = {
    text: age,
    y: nameAttr.y + (name.length * 69 * nameAttr.scaleY + 20),
    x: age.length < 4 ? 820 : age.length < 5 ? 893 : 921,
    fontSize: 69,
    align: 'center',
    wrap: 'word',
    lineHeight: 1,
    verticalAlign: 'top',
    width: 69 * 7,
    scaleX: age.length < 4 ? 0.9 : age.length < 5 ? 0.6 : 0.48,
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
      {title && (
        <>
          <Text {...titleAttr} lineJoin="round" stroke="#000" strokeWidth={14} />
          <Text {...titleAttr} fill="#fff" stroke="#fff" strokeWidth={3} />
        </>
      )}
      <Text {...nameAttr} lineJoin="round" stroke="#000" strokeWidth={18} />
      <Text {...nameAttr} fill="#fff" stroke="#fff" strokeWidth={3} />
      <Text {...ageAttr} lineJoin="round" stroke="#000" strokeWidth={18} />
      <Text {...ageAttr} fill="#fff" stroke="#fff" strokeWidth={3} />
    </Group>
  );
};
