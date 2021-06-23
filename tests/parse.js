// import { test, expect } from '@jest/globals';
// import { parse } from '../src/index';
// import loadFile from './utils/load-file';

// test('it works', async () => {
//   const buff = await loadFile('./tests/fonts/roboto.ttf');

//   expect(buff).toBe(4);
// });

// const main = async () => {
//   await loadFile('./tests/fonts/roboto.ttf');
// }

// main();

import { promises as fs } from 'fs';

function readASCII(view, pos, len) {
  let s = '';

  for (let i = 0; i < len; i++) {
    s += String.fromCharCode(view.getInt8(pos + i));
  }

  return s;
}

function readUnicode(view, pos, len) {
  let s = '';

  for (let i = 0; i < len; i += 2) {
    s += String.fromCharCode(view.getInt16(pos + i));
  }

  return s;
}

async function loadFile(path) {
  const buff = await fs.readFile(path);

  // return buff;
  return new Uint8Array(buff).buffer;
}

let ab = await loadFile('./tests/fonts/roboto.ttf');
// let ab = await loadFile('./tests/fonts/wetware.otf');

// const view = new DataView(ab);
// const numTables = view.getInt16(4);

// console.log(view);
// console.log('numTables', view.getInt16(4));

// for (let i = 0, offset = 12; i < numTables; i++, offset += 16) {
//   let tag = readASCII(view, offset, 4);
//   let checkSum = view.getUint32(offset + 4);
//   let toffset = view.getUint32(offset + 8);
//   let length = view.getUint32(offset + 12);

//   console.log(tag, toffset, length, checkSum);
// }

class Name {
  view;
  offset;
  length;

  constructor(view, offset, length) {
    this.view = view;
    this.offset = offset;
    this.length = length;

    this.parse();
  }

  parse() {
    const count = this.view.getInt16(this.offset + 2);
    const tables = {};

    for (let i = 0, offset = this.offset + 6; i < count; i++, offset += 12) {
      let platformID = this.view.getInt16(offset);
      let encodingID = this.view.getInt16(offset + 2);
      let languageID = this.view.getInt16(offset + 4);
      let nameID = this.view.getInt16(offset + 6);
      let slen = this.view.getInt16(offset + 8);
      let noffset = this.view.getInt16(offset + 10);
      let soff = this.offset + 6 + count * 12 + noffset;
      let str;

      if (platformID === 0 || (platformID === 3 && encodingID === 0)) {
        str = readUnicode(this.view, soff, slen);
      } else if (encodingID == 0) {
        str = readASCII(this.view, soff, slen);
      } else {
        str = readUnicode(this.view, soff, slen);
      }

      let key = `${platformID}_${languageID}`;

      if (!tables[key]) {
        tables[key] = { platformID, languageID, data: {} };
      }

      tables[key].data[nameID] = str;
    }

    const keys = Object.keys(tables);

    if (keys.length === 1) {
      // One table
      return tables[keys[0]].data;
    } else if (tables['3_1033']) {
      // English
      return tables['3_1033'].data;
    } else if (tables['3_0']) {
      // Universal
      return tables['3_0'].data;
    } else {
      // Last table
      return tables[keys.length - 1].data;
    }
  }
}

class FontData {
  view;

  constructor(ab) {
    this.view = new DataView(ab);

    this.createTables();
  }

  createTables() {
    const numTables = this.view.getInt16(4);
    // const tables = {};

    for (let i = 0, offset = 12; i < numTables; i++, offset += 16) {
      const name = readASCII(this.view, offset, 4);
      const tableOffset = this.view.getUint32(offset + 8);
      const length = this.view.getUint32(offset + 12);

      if (name === 'name') {
        this.name = new Name(this.view, tableOffset, length);
      }

      // tables[name] = {
      //   name,
      //   checkSum: this.view.getUint32(offset + 4),
      //   offset: this.view.getUint32(offset + 8),
      //   length: this.view.getUint32(offset + 12),
      // };
    }


    // return tables;
  }
}

const fontData = new FontData(ab);

console.log(fontData.name);
