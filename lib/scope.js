var Node = require('./node'),
    Identifier = require('./identifier');

function Scope(parent, node) {
  this.parent = parent;
  this.node = node;
  this.childScopes = {};
  this.identifiers = {};

  this.scanNode(this.node);
}

Object.defineProperty(Scope.prototype, 'name', {
  get: function() {
    return this.node.id.name;
  }
});

Scope.prototype.getChildScopes = function getChildScopes() {
  return values(this.childScopes);
};

Scope.prototype.getChildScope = function getChildScope(name) {
  return this.childScopes[name];
};

Scope.prototype.addChildScope = function addChildScope(node) {
  return this.childScopes[node.id.name] = new Scope(this, node);
};

Scope.prototype.getIdentifiers = function getIdentifiers() {
  return values(this.identifiers);
};

Scope.prototype.getIdentifier = function getIdentifier(name) {
  var identifier = this.identifiers[name];
  if (!identifier && this.parent) {
    return this.parent.getIdentifier(name);
  }
  return identifier;
};

Scope.prototype.addIdentifier = function addIdentifier(node) {
  return this.identifiers[node.name] = new Identifier(this, node);
};

Scope.prototype.scanNode = function scanNode(node) {
  var self = this;

  node.getChildren().forEach(function(child) {
    switch (child.type) {
      case 'Identifier':
        self.addIdentifier(child);
        break;

      case 'VariableDeclarator':
        self.addIdentifier(child.id);
        break;

      case 'FunctionDeclaration':
        self.addIdentifier(child.id);
        self.addChildScope(child);
        return;

      case 'FunctionExpression':
        var childScope = self.addChildScope(child);
        if (child.id)
          childScope.addIdentifier(child.id);
        return;
    }

    self.scanNode(child);
  });
};

function values(object) {
  var values = [];
  for (var key in object) {
    values.push(object[key]);
  }
  return values;
}

module.exports = Scope;
