import { promises as fs } from 'fs';

export default async function (path) {
  const buff = await fs.readFile(path);

  return buff;
  // return new Uint8Array(buff).buffer;
}
