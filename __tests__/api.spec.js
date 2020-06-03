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

  test('scoped commits should not be filterd', () => {
    var text = `
    25135ae7 - Merge branch 'dev-1.20.0' into beta
    eee44e75 - feat: 习题类模板配置默认增加“解析”模块 (REDMINE-111120)
    7a98ffca - Merge branch 'dev-1.20.0' into beta
    3b643a37 - fix(content): 修复 简单富文本无法保存/分词带代码等问题(REDMINE-110775)
    82ab0859 - Merge branch 'dev-1.20.0' into beta
    70454050 - fix(content): 知识点标签在任何状态下都可以打，不依赖应用内容的状态 (REDMINE-110620)
    71a6e390 - fix(content): 独立应用内容列表图片显示根据上传的图片等比缩放
    6a4f75a0 - Merge branch 'dev-1.20.0' into beta
    4bc79004 - fix(content): 选择题：选项内容不可以为空 (REDMINE-111040)
    00daaa77 - fix(content): 内容编辑页面：应不可以编辑他人的反馈内容 - (REDMINE-110325)
    ad1641be - refactor: modal styled + min-max height
    f18e9625 - fix: 修复:内容为空的时候，提交应该为disabled (REDMINE-110924)
    `;

    var res = nx.commitsParser({ text });
    expect(res.feat.length).toBe(1);
    expect(res.fix.length).toBe(6);
  })
});
