var infer = require('../infer');

require('should');

describe('infer', function() {
  it('produces an AST', function() {
    infer('var foo = "bar";').should.eql({
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'foo'
              },
              init: {
                type: 'Literal',
                value: 'bar',
                raw: '"bar"'
              }
            }
          ]
        }
      ]
    });
  });
});
