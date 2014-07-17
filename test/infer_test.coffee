infer = require('../infer')

require('should')

describe 'infer', ->
  program = infer(
    '''
    var foo = 'foo',
        bar = 'bar';
    '''
  )

  it 'produces a Scope object', ->
    program.should.be.an.instanceOf(infer.Scope)

  it 'has access to its identifiers', ->
    program.getIdentifiers().should.eql(['foo', 'bar'])
