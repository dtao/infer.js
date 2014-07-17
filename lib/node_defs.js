/**
 * A mapping from node types to the names of their properties which represent child nodes. (There is
 * no need to include "id" in any of these lists.)
 *
 * This data was taken straight from the Mozilla docs here:
 * https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
 */
module.exports = {
  // statements
  'Program': ['body'],
  'BlockStatement': ['body'],
  'ExpressionStatement': ['expression'],
  'IfStatement': ['test', 'consequent', 'alternate'],
  'LabeledStatement': ['label', 'body'],
  'BreakStatement': ['label'],
  'ContinueStatement': ['label'],
  'WithStatement': ['object', 'body'],
  'SwitchStatement': ['discriminant', 'cases'],
  'ReturnStatement': ['argument'],
  'ThrowStatement': ['argument'],
  'TryStatement': ['block', 'handler', 'finalizer'],
  'WhileStatement': ['test', 'body'],
  'DoWhileStatement': ['body', 'test'],
  'ForStatement': ['init', 'test', 'update', 'body'],
  'ForInStatement': ['left', 'right', 'body'],
  'ForOfStatement': ['left', 'right', 'body'], // es6
  'LetStatement': ['head', 'body'], //es6
  'DebuggerStatement': [],

  // declarations
  'FunctionDeclaration': ['params', 'body'],
  'VariableDeclaration': ['declarations'],
  'VariableDeclarator': ['init'],

  // expressions
  'ThisExpression': [],
  'ArrayExpression': ['elements'],
  'ObjectExpression': ['properties'],
  'FunctionExpression': ['params', 'body'],
  'ArrowExpression': ['params', 'body'], // es6
  'SequenceExpression': ['expressions'],
  'UnaryExpression': ['argument'],
  'BinaryExpression': ['left', 'right'],
  'AssignmentExpression': ['left', 'right'],
  'UpdateExpression': ['argument'],
  'LogicalExpression': ['left', 'right'],
  'ConditionalExpression': ['test', 'consequent', 'alternate'],
  'NewExpression': ['callee', 'arguments'],
  'CallExpression': ['callee', 'arguments'],
  'MemberExpression': ['object', 'property'],
  'YieldExpression': ['argument'], // es6
  'ComprehensionExpression': ['body', 'blocks', 'filter'], // es6
  'GeneratorExpression': ['body', 'blocks', 'filter'], // es6
  'GraphExpression': ['expression'], // es6
  'LetExpression': ['head', 'body'], // es6

  // patterns (?)
  'ObjectPattern': ['properties'],
  'ArrayPattern': ['elements'],

  // clauses
  'SwitchCase': ['test', 'consequent'],
  'CatchClause': ['param', 'body'],
  'ComprehensionBlock': ['left', 'right'], // es6?

  // miscellaneous
  'Identifier': [],
  'Literal': []
};
