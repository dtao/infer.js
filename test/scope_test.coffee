infer = require('../infer')
should = require('should')

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

  describe '#getIdentifier', ->
    outerScope = null; innerScope = null

    beforeEach ->
      program =
        '''
        function outer(a, b) {
          var outerVar = a + b;

          function inner(b) {
            var innerVar = outerVar;

            function deepest(c) {
              var deepestVar = innerVar;
            }
          }
        }
        '''

      outerScope = result().getChildScope('outer')
      innerScope = outerScope.getChildScope('inner')

    it 'will get an identifier from the current scope', ->
      innerScope.getIdentifier('b').should.have.properties({
        name: 'b',
        scope: innerScope
      })

    it 'will get an identifier from an enclosing (parent) scope', ->
      innerScope.getIdentifier('a').should.have.properties({
        name: 'a',
        scope: outerScope
      })

    it 'will not get an identifier from an inner scope', ->
      should(innerScope.getIdentifier('c')).not.be.ok
