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
  this.childScopes[node.id.name] = new Scope(this, node);
};

Scope.prototype.getIdentifiers = function getIdentifiers() {
  return values(this.identifiers);
};

Scope.prototype.addIdentifier = function addIdentifier(name) {
  this.identifiers[name] = name;
};

Scope.prototype.scanNode = function scanNode(node) {
  var self = this;

  compact(getChildren(node)).forEach(function(child) {
    if (/^Function/.test(child.type)) {
      if (child.id) {
        self.addIdentifier(child.id.name);
      }
      self.addChildScope(child);
      return;
    }

    if (child.type === 'Identifier') {
      self.addIdentifier(child.name);
    }

    self.scanNode(child);
  });
};

function getChildren(node) {
  switch (node.type) {
    case 'Program': return node.body;
    case 'VariableDeclaration': return node.declarations;
    case 'VariableDeclarator': return [node.id, node.init];
    case 'Identifier': return [];
    case 'Literal': return [];
    case 'FunctionDeclaration': return node.params.concat([node.body]);
    case 'BlockStatement': return node.body;
    case 'FunctionExpression': return node.params.concat([node.body]);
    case 'CallExpression': return [node.callee].concat(node.arguments);
  }

  dumpNode(node);
  throw new Error('Not sure how to get children of "' + node.type + '" node.');
}

function dumpNode(node) {
  console.error('\n\n');
  console.error('"' + node.type + '" node:');
  Object.keys(node).sort().forEach(function(prop) {
    console.error(prop + ': ' + getPropertyType(node[prop]));
  });
  console.error('\n\n');
}

function getPropertyType(value) {
  switch (typeof value) {
    case 'boolean':
    case 'function':
    case 'number':
    case 'string':
      return typeof value;

    default:
      if (!value) { return '?'; }
      if (value instanceof Array) { return 'array'; }
      if (value.type) { return value.type; }
      return 'object';
  }
}

function compact(array) {
  return array.filter(function(e) { return !!e; });
}

function values(object) {
  var values = [];
  for (var key in object) {
    values.push(object[key]);
  }
  return values;
}

module.exports = Scope;
