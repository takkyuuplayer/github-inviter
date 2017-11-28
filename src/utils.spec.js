import assert from 'power-assert';
import fs from 'fs';

import * as utils from './utils';

describe('utils', () => {
  describe('.pathTo', () => {
    it('should return absolute path', () => {
      assert(fs.statSync(utils.pathTo('src/utils.spec.js')).isFile());
      assert(fs.statSync(utils.pathTo()).isDirectory());
    });
  });
  describe('slurpFile', () => {
    it('should return content of file', () => {
      const text = utils.slurpFile('test/data/test.json');

      assert.strictEqual(text, '{"a":1,"b":2}');
    });
  });
  describe('slurpJSON', () => {
    it('should parse JSON file', () => {
      const json = utils.slurpJSON('test/data/test.json');

      assert.deepStrictEqual(json, {
        a: 1,
        b: 2,
      });
    });
  });
});
