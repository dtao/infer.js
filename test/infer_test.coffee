infer = require('../infer')

require('should')

describe 'infer', ->
  program = null

  beforeEach ->
    program =
      '''
      var foo = 'foo',
          bar = 'bar';
      '''

  result = ->
    infer(program)

  it 'produces a Scope object', ->
    result().should.be.an.instanceOf(infer.Scope)
