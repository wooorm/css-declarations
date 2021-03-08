import test from 'tape'
import {parse, stringify} from './index.js'

test('css-declarations', function (t) {
  t.test('.parse()', function (st) {
    st.equal(typeof parse, 'function', 'should be a method')

    st.deepEqual(
      parse(),
      {},
      'should return an empty object for an empty value'
    )

    st.deepEqual(
      parse('\n\t\t '),
      {},
      'should return an empty object for white-space'
    )

    st.deepEqual(
      parse('color: red; font-weight: bolder'),
      {color: 'red', fontWeight: 'bolder'},
      'should work'
    )

    st.deepEqual(
      parse('-webkit-border-radius: 3px'),
      {webkitBorderRadius: '3px'},
      'should capitalise prefixes correctly'
    )

    st.deepEqual(
      parse('/*background-*/color: /*purple*/red'),
      {color: 'red'},
      'should ignore comments correctly'
    )

    st.test('warnings', function (sst) {
      var index = -1
      var matrix = [
        ["missing '}'", 0],
        ["missing '{'", 10]
      ]

      sst.plan(7)

      /** Handler */
      function warning() {
        index++

        sst.equal(arguments[0], matrix[index][0])
        sst.equal(arguments[1], matrix[index][1])
        sst.equal(arguments.length, 2)
      }

      sst.deepEqual(
        parse('!important', {warning}),
        {},
        'should ignore invalid declarations'
      )
    })

    st.end()
  })

  t.test('.stringify()', function (st) {
    st.equal(typeof stringify, 'function', 'should be a method')

    st.deepEqual(
      stringify({}),
      '',
      'should return an empty string for an empty object'
    )

    st.deepEqual(
      stringify({color: null, borderColor: undefined}),
      '',
      'should ignore `null` and `undefined` values'
    )

    st.deepEqual(
      stringify({color: ''}),
      'color: ;',
      'should return an empty declaration for empty strings'
    )

    st.deepEqual(
      stringify({color: 'red', backgroundColor: 'blue'}),
      'color: red; background-color: blue;',
      'should work'
    )

    st.deepEqual(
      stringify({webkitBorderRadius: '3px !important'}),
      '-webkit-border-radius: 3px !important;',
      'should support prefixes'
    )

    st.end()
  })

  t.end()
})
