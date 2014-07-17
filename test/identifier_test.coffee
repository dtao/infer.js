infer = require('../infer')

require('should')

describe 'infer.Identifier', ->
  program = null

  beforeEach ->
    program =
      '''
      var foo = 'foo',
          bar = 'bar';
      '''

  result = ->
    infer(program)

  it 'defines the type of objects stored by Scopes', ->
    result().getIdentifier('foo').should.be.an.instanceOf(infer.Identifier)
