import readASCII from './operations/readASCII';

export function parse(ab: ArrayBuffer): number {
  const view = new DataView(ab);

  const numTables = view.getUint8(2);

  // const tag = readASCII(buff, 0, 4);

  return ab;
}
