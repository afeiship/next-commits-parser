# next-commits-parser
> Git commits parser.

## installation
```bash
npm install -S @feizheng/next-commits-parser
```

## usage
```js
import '@feizheng/next-commits-parser';

nx.commitsParser(
  fs.readFileSync('__tests__/logger.txt')
);

/*
{
  feat: [
    {
      action: 'feat',
      message: '    eee44e75 - feat: 习题类模板配置默认增加“解析”模块 (REDMINE-111120)'
    }
  ],
  fix: [
    {
      action: 'fix',
      message: '    3b643a37 - fix(content): 修复 简单富文本无法保存/分词带代码等问题(REDMINE-110775)'
    },
    {
      action: 'fix',
      message: '    70454050 - fix(content): 知识点标签在任何状态下都可以打，不依赖应用内容的状态 (REDMINE-110620)'
    },
    {
      action: 'fix',
      message: '    71a6e390 - fix(content): 独立应用内容列表图片显示根据上传的图片等比缩放'
    },
    {
      action: 'fix',
      message: '    4bc79004 - fix(content): 选择题：选项内容不可以为空 (REDMINE-111040)'
    },
    {
      action: 'fix',
      message: '    00daaa77 - fix(content): 内容编辑页面：应不可以编辑他人的反馈内容 - (REDMINE-110325)'
    },
    {
      action: 'fix',
      message: '    f18e9625 - fix: 修复:内容为空的时候，提交应该为disabled (REDMINE-110924)'
    }
  ],
  refactor: [
    {
      action: 'refactor',
      message: '    ad1641be - refactor: modal styled + min-max height'
    }
  ]
}
*/
```
