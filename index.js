/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module css-declarations
 * @fileoverview Parse and stringify CSS declarations.
 */

'use strict';

/* Dependencies. */
var css = require('css');
var paramCase = require('param-case');
var camelCase = require('camelcase');
var locations = require('vfile-location');
var vendors = require('vendors');

/* Expose. */
exports.parse = parse;
exports.stringify = stringify;

/* Constants. */
var EMPTY = '';

/* Characters. */
var C_SPACE = ' ';
var C_DASH = '-';
var C_UNDERSCORE = '_';
var C_SEMI_COLON = ';';
var C_COLON = ':';

/* Suffix to wrap around declarations. */
var PREFIX = 'i{';
var SUFFIX = '}';

/* Configuration for `reworkcss/css`. */
var CSS_OPTIONS = {silent: true};

/**
 * Parse CSS declarations to an object.
 *
 * @param {string} value - Declarations as string.
 * @param {Object} [options] - Configuration.
 * @param {Function} [options.warning] - Invoked when
 *   errors occur.
 * @return {Object} - Declarations as object.
 */
function parse(value, options) {
  var input = String(value || EMPTY);
  var max = input.length;
  var declarations = {};
  var settings = options || {};
  var warn = settings.warning;
  var location;
  var sheet;
  var results;
  var warnings;
  var length;
  var index;
  var result;
  var warning;
  var offset;

  input = PREFIX + input + SUFFIX;
  location = locations(input);

  sheet = css.parse(input, CSS_OPTIONS).stylesheet;
  results = sheet.rules[0].declarations || [];
  warnings = sheet.parsingErrors;

  index = -1;
  length = results.length;

  while (++index < length) {
    result = results[index];

    if (result.type === 'declaration') {
      declarations[toJavaScriptName(result.property)] = result.value;
    }
  }

  index = -1;
  length = warn && warnings.length;

  while (++index < length) {
    warning = warnings[index];
    offset = Math.min(max, location.toOffset({
      line: warning.line,
      column: warning.column
    }) - PREFIX.length);

    warn(warning.reason, offset);
  }

  return declarations;
}

/**
 * Compile a declarations object to string.
 *
 * @param {Object} values - Declarations as object.
 * @return {string} - Declarations as string.
 */
function stringify(values) {
  var results = [];
  var key;
  var value;

  for (key in values) {
    value = values[key];

    if (value !== null && value !== undefined) {
      results.push([toCSSName(key), value].join(C_COLON + C_SPACE));
    }
  }

  value = results.join(C_SEMI_COLON + C_SPACE);

  return value ? value + C_SEMI_COLON : EMPTY;
}

/**
 * Transform `cssName` to `javaScriptName`.
 *
 * @param {string} cssName - Dash-cased name.
 * @return {string} - Camel-cased name.
 */
function toJavaScriptName(cssName) {
  var char = cssName.charAt(0);

  return camelCase(cssName.slice(
    char === C_DASH || char === C_UNDERSCORE ? 1 : 0
  ));
}

/**
 * Transform `javaScriptName` to `cssName`.
 *
 * @param {string} javaScriptName - Camel-cased name.
 * @return {string} - Dash-cased name.
 */
function toCSSName(javaScriptName) {
  var cssName = paramCase(javaScriptName);
  var pos = cssName.indexOf(C_DASH);
  var subvalue = pos === -1 ? null : cssName.slice(0, pos);

  if (subvalue && vendors.indexOf(subvalue) !== -1) {
    cssName = C_DASH + cssName;
  }

  return cssName;
}
