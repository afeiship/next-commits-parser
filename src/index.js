(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var groupBy = require('@jswork/next-group-by');
  var includesMulti = require('@jswork/next-includes-multi');

  var DEFAULT_OPTIONS = {
    text: '',
    actions: ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert'],
    template: nx.stubValue
  };

  nx.commitsParser = function (inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var commits = options.text.split('\n');
    var loggers = [];

    if (!options.text) return null;

    commits.forEach(function (commit) {
      nx.forEach(options.actions, function (action) {
        var target = [action + ':', action + '('];
        if (includesMulti(commit, { target: target })) {
          loggers.push({ action: action, message: options.template(commit) });
          return nx.BREAKER;
        }
      });
    });

    return groupBy(loggers, function (_, item) {
      return item.action;
    });
  };


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.commitsParser;
  }
})();
