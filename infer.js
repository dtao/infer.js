var esprima = require('esprima'),
    Node = require('./lib/node'),
    Identifier = require('./lib/identifier'),
    Scope = require('./lib/scope');

function infer(js) {
  var ast = esprima.parse(js);
  return new Scope(null, Node.create(ast));
}

infer.Identifier = Identifier;
infer.Scope = Scope;

module.exports = infer;
