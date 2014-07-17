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

  names = (array) ->
    array.map (scope) -> scope.name

  it 'produces a Scope object', ->
    result().should.be.an.instanceOf(infer.Scope)

  it 'has access to its identifiers', ->
    result().getIdentifiers().should.eql(['foo', 'bar'])

  describe 'for a program w/ some nested scopes', ->
    beforeEach ->
      program =
        '''
        function outer(a, b) {
          function inner(x, y) {
            var foo;
          }
          var bar = inner();
        }
        '''

    it 'includes functions in identifiers', ->
      result().getIdentifiers().should.eql(['outer'])

    it 'provides access to child scopes', ->
      names(result().getChildScopes()).should.eql(['outer'])
      names(result().getChildScope('outer').getChildScopes()).should.eql(['inner'])

    it 'child scopes have identifiers', ->
      result().getChildScope('outer').getIdentifiers().should.eql(['a', 'b', 'inner', 'bar'])
