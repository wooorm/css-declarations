'use strict'

var test = require('tape')
var cssDeclarations = require('.')

test('css-declarations', function(t) {
  t.equal(typeof cssDeclarations, 'object', 'should be an `object`')

  t.test('.parse()', function(st) {
    st.equal(typeof cssDeclarations.parse, 'function', 'should be a method')

    st.deepEqual(
      cssDeclarations.parse(),
      {},
      'should return an empty object for an empty value'
    )

    st.deepEqual(
      cssDeclarations.parse('\n\t\t '),
      {},
      'should return an empty object for white-space'
    )

    st.deepEqual(
      cssDeclarations.parse('color: red; font-weight: bolder'),
      {color: 'red', fontWeight: 'bolder'},
      'should work'
    )

    st.deepEqual(
      cssDeclarations.parse('-webkit-border-radius: 3px'),
      {webkitBorderRadius: '3px'},
      'should capitalise prefixes correctly'
    )

    st.deepEqual(
      cssDeclarations.parse('/*background-*/color: /*purple*/red'),
      {color: 'red'},
      'should ignore comments correctly'
    )

    st.test('warnings', function(sst) {
      var index = -1
      var matrix = [["missing '}'", 0], ["missing '{'", 10]]

      sst.plan(7)

      /** Handler */
      function warning() {
        index++

        sst.equal(arguments[0], matrix[index][0])
        sst.equal(arguments[1], matrix[index][1])
        sst.equal(arguments.length, 2)
      }

      sst.deepEqual(
        cssDeclarations.parse('!important', {warning: warning}),
        {},
        'should ignore invalid declarations'
      )
    })

    st.end()
  })

  t.test('.stringify()', function(st) {
    st.equal(typeof cssDeclarations.stringify, 'function', 'should be a method')

    st.deepEqual(
      cssDeclarations.stringify({}),
      '',
      'should return an empty string for an empty object'
    )

    st.deepEqual(
      cssDeclarations.stringify({color: null, borderColor: undefined}),
      '',
      'should ignore `null` and `undefined` values'
    )

    st.deepEqual(
      cssDeclarations.stringify({color: ''}),
      'color: ;',
      'should return an empty declaration for empty strings'
    )

    st.deepEqual(
      cssDeclarations.stringify({color: 'red', backgroundColor: 'blue'}),
      'color: red; background-color: blue;',
      'should work'
    )

    st.deepEqual(
      cssDeclarations.stringify({webkitBorderRadius: '3px !important'}),
      '-webkit-border-radius: 3px !important;',
      'should support prefixes'
    )

    st.end()
  })

  t.end()
})
