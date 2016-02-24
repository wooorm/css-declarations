# css-declarations [![Build Status][build-badge]][build-page] [![Coverage Status][coverage-badge]][coverage-page]

Parse and stringify CSS declarations.
For example, an HTML `style` attribute.

## Installation

[npm][]:

```bash
npm install css-declarations
```

**css-declarations** is also available as an AMD, CommonJS, and
globals module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var cssDeclarations = require('css-declarations');
```

Parsing:

```javascript
var values = cssDeclarations.parse(
    'color:/*red*/purple; -webkit-border-radius: 3px !important;;'
);
```

Yields:

```js
{ color: 'purple', webkitBorderRadius: '3px !important' }
```

Compiling:

```javascript
var value = cssDeclarations.stringify(values);
```

Yields:

```js
'color: purple; -webkit-border-radius: 3px !important;'
```

## API

### `cssDeclarations.parse(value[, options])`

Parse CSS declarations from `string` to `object`.

*   `value` (`string`) — Comma-separated tokens;

*   `options` (`Object`, optional):

    *   `warning` ([`Function`][warning])
        — When given, `warning` is invoked when an error is encountered.

**Returns**: `Object.<string, string>` — Declarations.

### `function warning(reason, offset)`

Invoked when an error occurs. Errors originate from [`reworkcss/css`][css].

**Parameters**:

*   `reason` (`string`) — English reason for failure;
*   `offset` (`number`) — Index-based position of error.

### `cssDeclarations.stringify(values)`

Compile CSS declarations from `object` to `string`.

*   `values` (`Object<string, string>`) — Declarations.

**Returns**: `string` — Comma-separated tokens.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/css-declarations.svg

[build-page]: https://travis-ci.org/wooorm/css-declarations

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/css-declarations.svg

[coverage-page]: https://codecov.io/github/wooorm/css-declarations?branch=master

[npm]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/css-declarations/releases

[license]: LICENSE

[author]: http://wooorm.com

[warning]: #function-warningreason-offset

[css]: https://github.com/reworkcss/css
