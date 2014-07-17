/**
 * A mapping from node types to the names of their properties which represent
 * child nodes. (There is no need to include "id" in any of these lists.)
 */
module.exports = {
  // statements
  'Program': ['body'],
  'VariableDeclaration': ['declarations'],
  'VariableDeclarator': ['id', 'init'],
  'FunctionDeclaration': ['params', 'body'],
  'BlockStatement': ['body'],

  // expressions
  'Identifier': [],
  'Literal': [],
  'FunctionExpression': ['params', 'body'],
  'CallExpression': ['callee', 'arguments'],
  'BinaryExpression': ['left', 'right']
};
