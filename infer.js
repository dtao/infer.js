var esprima = require('esprima');

module.exports = function infer(js) {
  return esprima.parse(js);
};
