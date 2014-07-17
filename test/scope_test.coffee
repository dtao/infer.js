infer = require('../infer')

require('should')

describe 'infer.Scope', ->
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
    array.map (e) -> e.name

  it 'has access to its identifiers', ->
    names(result().getIdentifiers()).should.eql(['foo', 'bar'])

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
      names(result().getIdentifiers()).should.eql(['outer'])

    it 'provides access to child scopes', ->
      names(result().getChildScopes()).should.eql(['outer'])
      names(result().getChildScope('outer').getChildScopes()).should.eql(['inner'])

    it 'child scopes have identifiers', ->
      names(result().getChildScope('outer').getIdentifiers()).should.eql(['a', 'b', 'inner', 'bar'])

    it 'the nesting can just keep going', ->
      names(result().getChildScope('outer').getChildScope('inner').getIdentifiers()).should.eql(['x', 'y', 'foo'])
