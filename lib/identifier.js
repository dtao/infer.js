function Identifier(scope, node) {
  this.scope = scope;
  this.node = node;
}

Object.defineProperty(Identifier.prototype, 'name', {
  get: function() {
    return this.node.name;
  }
});

module.exports = Identifier;
