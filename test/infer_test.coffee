infer = require('../infer')

require('should')

describe 'infer', ->
  it 'produces a Scope object', ->
    infer('var foo = "foo";').should.be.an.instanceOf(infer.Scope)
