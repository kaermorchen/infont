import { module, test } from '../util';

module('test', () => {
  test('it works', async (assert) => {
    assert.dom('img').exists();
  });
});
