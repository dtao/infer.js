var esprima = require('esprima');

function infer(js) {
  return new infer.Scope(esprima.parse(js));
}

infer.Scope = function Scope(node) {
  this.node = node;
  this.identifiers = [];
  this.scanNode(this.node);
};

infer.Scope.prototype.scanNode = function scanNode(node) {
  var self = this,
      identifiers = this.identifiers;

  getChildren(node).forEach(function(child) {
    if (child.type === 'Identifier') {
      identifiers.push(child.name);
    }
    self.scanNode(child);
  });
};

infer.Scope.prototype.getIdentifiers = function getIdentifiers() {
  return this.identifiers;
};

function getChildren(node) {
  switch (node.type) {
    case 'Program': return node.body;
    case 'VariableDeclaration': return node.declarations;
    case 'VariableDeclarator': return [node.id, node.init];
    case 'Identifier': return [];
    case 'Literal': return [];
  }

  throw new Error('Not sure how to get children of "' + node.type + '" node.');
}

module.exports = infer;
