import { parse } from '../src/index';

test('it works', () => {
  expect(parse(1, 1)).toBe(2);
});
