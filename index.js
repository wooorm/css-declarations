import css from 'css'
import locations from 'vfile-location'
import {vendors} from 'vendors'

/**
 * @typedef CssDeclarationsOptions
 * @property {(reason: string, offset: number) => void} [warning] Function called on errors
 */

/**
 * Parse CSS declarations to an object.
 *
 * @param {string} [value]
 * @param {CssDeclarationsOptions} [options]
 * @returns {Record.<string, string>} Declarations
 */
export function parse(value, options) {
  var source = String(value || '')
  var rule = 'i{' + source + '}'
  var location = locations(rule)
  var sheet = css.parse(rule, {silent: true}).stylesheet
  // @ts-ignore to loose `css` types.
  var results = sheet.rules[0].declarations || []
  var index = -1
  var declarations = {}
  var offset

  while (++index < results.length) {
    if (results[index].type === 'declaration') {
      declarations[toJsName(results[index].property)] = String(
        results[index].value
      )
    }
  }

  if (options && options.warning) {
    index = -1

    while (++index < sheet.parsingErrors.length) {
      offset = Math.min(
        source.length,
        location.toOffset({
          line: sheet.parsingErrors[index].line,
          column: sheet.parsingErrors[index].column
        }) - 2 // `'i{'.length`
      )

      options.warning(sheet.parsingErrors[index].reason, offset)
    }
  }

  // @ts-ignore to loose `css` types.
  return declarations
}

/**
 * Serialize declarations.
 *
 * @param {Record.<string, string>} declarations
 * @returns {string}
 */
export function stringify(declarations) {
  var results = []
  var result
  var key

  for (key in declarations) {
    if (declarations[key] !== null && declarations[key] !== undefined) {
      results.push([toCssName(key), declarations[key]].join(': '))
    }
  }

  result = results.join('; ')
  return result ? result + ';' : ''
}

// Transform `cssName` to `jsName`.
function toJsName(cssName) {
  var head = cssName.charCodeAt(0)
  return camel(
    head === 45 /* `-` */ || head === 95 /* `_` */ ? cssName.slice(1) : cssName
  )
}

// Transform `jsName` to `cssName`.
function toCssName(jsName) {
  var cssName = parameter(jsName)
  var index = cssName.indexOf('-')
  var subvalue

  if (index > -1) {
    subvalue = cssName.slice(0, index)
    if (vendors.indexOf(subvalue) > -1) cssName = '-' + cssName
  }

  return cssName
}

function camel(value) {
  return value.replace(/-./g, replacer)
  function replacer($0) {
    return $0.charAt(1).toUpperCase()
  }
}

function parameter(value) {
  return value.replace(/[A-Z]/g, replacer)
  function replacer($0) {
    return '-' + $0.toLowerCase()
  }
}
