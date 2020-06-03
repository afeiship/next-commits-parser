/*!
 * name: @alo7i/next-commits-parser
 * description: Git commits parser.
 * homepage: https://github.com/afeiship/next-commits-parser
 * version: 1.0.0
 * date: 2020-06-03T09:35:16.408Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var groupBy = require('@feizheng/next-group-by');
  var DEFAULT_OPTIONS = {
    text: '',
    actions: [
      "feat",
      "fix",
      "docs",
      "style",
      "refactor",
      "perf",
      "test",
      "chore",
      "revert"
    ],
    template: stubValue
  }

  nx.commitsParser = function (inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var commits = inOptions.text.split('\n');
    var loggers = [];

    commits.forEach(function (commit) {
      nx.forEach(options.actions, function (action) {
        if (commit.includes(action + ':')) {
          loggers.push({ action: action, message: options.template(commit) })
          return nx.BREAKER;
        }
      })
    });

    return groupBy(loggers, function (_, item) {
      return item.action
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.commitsParser;
  }
})();

//# sourceMappingURL=next-commits-parser.js.map
