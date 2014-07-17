var nodeDefs = require('./node_defs');

function Node(data) {
  for (var prop in data) {
    this[prop] = data[prop];
  }
}

Node.prototype.getChildren = function() {
  dumpNode(this);
  throw new Error('Not sure how to get children of "' + this.type + '" node.');
};

Object.keys(nodeDefs).forEach(function(nodeType) {
  var ctor = Node[nodeType] = function(node) {
    Node.call(this, node);
  };

  ctor.prototype = Object.create(Node.prototype);
  ctor.prototype.constructor = ctor;

  ctor.prototype.getChildren = function() {
    var self = this,
        children = this.children;

    if (!children) {
      children = [];

      nodeDefs[nodeType].forEach(function(childProperty) {
        var childValue = self[childProperty];
        if (!childValue)
          return;

        if (childValue instanceof Array)
          children = children.concat(childValue.map(Node.create));
        else
          children.push(Node.create(childValue));
      });

      this.children = children;
    }

    return children;
  };
});

Node.create = function(node) {
  var ctor = Node[node.type];
  if (ctor) return new ctor(node);
  return new Node(node);
};

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

module.exports = Node;
