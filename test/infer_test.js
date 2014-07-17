var infer = require('../infer');

require('should');

describe('infer', function() {
  var program = infer('var foo = "bar";');

  it('produces a Scope object', function() {
    program.should.be.an.instanceOf(infer.Scope);
  });

  it('has access to its identifiers', function() {
    program.getIdentifiers().should.eql(['foo']);
  });
});
