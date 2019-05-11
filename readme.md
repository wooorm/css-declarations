# css-declarations

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Parse and stringify CSS declarations (such as the HTML `style`
attribute).

## Installation

[npm][]:

```bash
npm install css-declarations
```

## Usage

```javascript
var cssDeclarations = require('css-declarations')

var values = cssDeclarations.parse(`
  color:/*red*/purple;
  -webkit-border-radius: 3px !important;;
`)
// => {color: 'purple', webkitBorderRadius: '3px !important'}

cssDeclarations.stringify(values)
// => 'color: purple; -webkit-border-radius: 3px !important;'
```

## API

### `cssDeclarations.parse(value[, options])`

Parse CSS declarations from `string` to `object`.

###### `options`

*   `warning` ([`Function`][warning])
    — When given, `warning` is invoked when an error is encountered.

###### Returns

`Object.<string>` — Declarations.

### `cssDeclarations.stringify(values)`

Compile CSS declarations from `object` to `string`.

###### Returns

`string` — Stringified declarations.

### `function warning(reason, offset)`

Invoked when an error occurs.  Errors come from [`reworkcss/css`][css].

###### Parameters

*   `reason` (`string`) — English reason for error;
*   `offset` (`number`) — Index-based position of error.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/css-declarations.svg

[build]: https://travis-ci.org/wooorm/css-declarations

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/css-declarations.svg

[coverage]: https://codecov.io/github/wooorm/css-declarations

[downloads-badge]: https://img.shields.io/npm/dm/css-declarations.svg

[downloads]: https://www.npmjs.com/package/css-declarations

[size-badge]: https://img.shields.io/bundlephobia/minzip/css-declarations.svg

[size]: https://bundlephobia.com/result?p=css-declarations

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[warning]: #function-warningreason-offset

[css]: https://github.com/reworkcss/css
