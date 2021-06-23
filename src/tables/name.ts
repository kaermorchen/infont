import readASCII from "./operations/readASCII";

export default class Name {
  view: DataView;
  checkSum: number;
  offset: number;
  length: number;
  [s: string]: string;

  constructor(view: DataView, checkSum: number, offset: number, length: number) {
    this.view = view;
    this.checkSum = checkSum;
    this.offset = offset;
    this.length = length;

    this.parse();
  }

  parse() {

  }

  get tables() {
    const numTables = this.view.getInt16(4);
    const tables = {};

    for (let i = 0, offset = 12; i < numTables; i++, offset += 16) {
      const name = readASCII(this.view, offset, 4);

      tables[name] = {
        name,
        checkSum: this.view.getUint32(offset + 4),
        offset: this.view.getUint32(offset + 8),
        length: this.view.getUint32(offset + 12),
      };
    }

    return tables;
  }
}
