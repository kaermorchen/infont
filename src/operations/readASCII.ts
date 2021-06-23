export default function (view: DataView, pos: number, len: number): string {
  let s = '';

  for (let i = 0; i < len; i++) {
    s += String.fromCharCode(view.getInt8(pos + i));
  }

  return s;
}
