export const createImage = ({ src }: { src: string }) => {
  const obj = new globalThis.Image();

  obj.src = src;

  return obj;
};
