import { expect, test } from "@jest/globals";
import { parse } from "../src/main";

test("parse is a function", () => {
  expect(typeof parse).toBe('function');
});
