const nx = require('@feizheng/next-js-core2');
require('../src/next-commits-parser');
const fs = require('fs');

const logger = fs.readFileSync('./__tests__/logger.txt');


describe('api.basic test', () => {
  test('nx.commitsParser', function () {
    var res = nx.commitsParser({
      text: logger.toString().trim()
    });
    expect(res && typeof res === 'object').toBe(true);
    expect(Array.isArray(res.fix)).toBe(true);
  });

  test('when text is empty should return null', () => {
    var res = nx.commitsParser({
      text: ''
    });
    expect(res).toBe(null);
  })
});
