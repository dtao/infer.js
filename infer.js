var esprima = require('esprima'),
    Identifier = require('./lib/identifier'),
    Scope = require('./lib/scope');

function infer(js) {
  return new Scope(null, esprima.parse(js));
}

infer.Identifier = Identifier;
infer.Scope = Scope;

module.exports = infer;
