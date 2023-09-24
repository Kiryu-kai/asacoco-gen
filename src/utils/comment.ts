type CommentData = [string, string, ...(string | number)[]][];

export const formatComment = ({ comment }: { comment: string }) => {
  const value = comment.split('\n');

  return value.map((row) => {
    // TODO: findIndexとsliceにする
    // TODO: コロンの全半角を許容（キャレットが飛ぶので置換処理は onBlur の中でやること）
    const chars = row.split('：');
    const [name, ..._msg] = chars;
    const msg = _msg.join('：');

    if (2 <= chars.length) {
      if (!msg) {
        return [name, '[___EMPTY___]'];
      }

      if (!name) {
        return ['[___EMPTY___]', msg];
      }
    }

    return [name, msg];
  }) as CommentData;
};

export const convertToCommentString = (comment: (string | number)[][]) => {
  return comment
    .map(([name, text]) => {
      if (name === '[___EMPTY___]') {
        return `：${text}`;
      }

      if (text === '[___EMPTY___]') {
        return `${name}：`;
      }

      if (name && text) {
        return `${name}：${text}`;
      }

      return name;
    })
    .join('\n');
};
