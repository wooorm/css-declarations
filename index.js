'use strict'

var css = require('css')
var locations = require('vfile-location')
var vendors = require('vendors')

exports.parse = parse
exports.stringify = stringify

// Characters.
var space = ' '
var dash = '-'
var colon = ':'
var semicolon = ';'
var underscore = '_'
var lowercaseI = 'i'
var leftCurlyBrace = '{'
var rightCurlyBrace = '}'

// Expressions.
var uppercaseRe = /[A-Z]/g
var breakRe = /-./g

// Suffix to wrap around declarations.
var declarationsPrefix = lowercaseI + leftCurlyBrace
var declarationsSuffix = rightCurlyBrace

// Configuration for `reworkcss/css`.
var cssOption = {silent: true}

// Parse CSS declarations to an object.
function parse(value, options) {
  var input = String(value || '')
  var max = input.length
  var declarations = {}
  var settings = options || {}
  var warn = settings.warning
  var location
  var sheet
  var results
  var warnings
  var length
  var index
  var result
  var warning
  var offset

  input = declarationsPrefix + input + declarationsSuffix
  location = locations(input)

  sheet = css.parse(input, cssOption).stylesheet
  results = sheet.rules[0].declarations || []
  warnings = sheet.parsingErrors

  index = -1
  length = results.length

  while (++index < length) {
    result = results[index]

    if (result.type === 'declaration') {
      declarations[toJavaScriptName(result.property)] = result.value
    }
  }

  index = -1
  length = warn && warnings.length

  while (++index < length) {
    warning = warnings[index]
    offset = Math.min(
      max,
      location.toOffset({
        line: warning.line,
        column: warning.column
      }) - declarationsPrefix.length
    )

    warn(warning.reason, offset)
  }

  return declarations
}

// Compile a declarations object to string.
function stringify(values) {
  var results = []
  var key
  var value

  for (key in values) {
    value = values[key]

    if (value !== null && value !== undefined) {
      results.push([toCSSName(key), value].join(colon + space))
    }
  }

  value = results.join(semicolon + space)

  return value ? value + semicolon : ''
}

// Transform `cssName` to `javaScriptName`.
function toJavaScriptName(cssName) {
  var char = cssName.charAt(0)

  return camel(cssName.slice(char === dash || char === underscore ? 1 : 0))
}

// Transform `javaScriptName` to `cssName`.
function toCSSName(javaScriptName) {
  var cssName = param(javaScriptName)
  var pos = cssName.indexOf(dash)
  var subvalue = pos === -1 ? null : cssName.slice(0, pos)

  if (subvalue && vendors.indexOf(subvalue) !== -1) {
    cssName = dash + cssName
  }

  return cssName
}

function camel(val) {
  return val.replace(breakRe, replacer)
  function replacer($0) {
    return $0.charAt(1).toUpperCase()
  }
}

function param(val) {
  return val.replace(uppercaseRe, replacer)
  function replacer($0) {
    return dash + $0.toLowerCase()
  }
}
