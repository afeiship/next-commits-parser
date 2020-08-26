/*!
 * name: @feizheng/next-commits-parser
 * description: Git commits parser.
 * homepage: https://github.com/afeiship/next-commits-parser
 * version: 1.1.3
 * date: 2020-08-26T13:00:21.791Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var groupBy = require('@feizheng/next-group-by');
  var includesMulti = require('@feizheng/next-includes-multi');

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
    template: nx.stubValue
  }

  nx.commitsParser = function (inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var commits = options.text.split('\n');
    var loggers = [];

    if (!options.text) return null;

    commits.forEach(function (commit) {
      nx.forEach(options.actions, function (action) {
        var target = [action + ':', action + '('];
        if (includesMulti(commit, { target: target })) {
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
