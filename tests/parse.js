import { test, expect } from '@jest/globals';
import { parse } from '../src/index';

test('it works', () => {
  expect(parse(1, 1)).toBe(2);
  expect(parse(2, 1)).not.toBe(2);
});
