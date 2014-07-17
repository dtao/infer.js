var esprima = require('esprima'),
    Scope = require('./lib/scope');

function infer(js) {
  return new Scope(null, esprima.parse(js));
}

infer.Scope = Scope;

module.exports = infer;
