# css-declarations [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Parse and stringify CSS declarations (such as the HTML `style`
attribute).

## Installation

[npm][]:

```bash
npm install css-declarations
```

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

###### `options`

*   `warning` ([`Function`][warning])
    — When given, `warning` is invoked when an error is encountered.

###### Returns

`Object.<string>` — Declarations.

### `cssDeclarations.stringify(values)`

Compile CSS declarations from `object` to `string`.

###### Parameters

*   `values` (`Object<string>`) — Declarations.

###### Returns

`string` — Stringified declarations.

### `function warning(reason, offset)`

Invoked when an error occurs. Errors come from [`reworkcss/css`][css].

###### Parameters

*   `reason` (`string`) — English reason for failure;
*   `offset` (`number`) — Index-based position of error.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/css-declarations.svg

[travis]: https://travis-ci.org/wooorm/css-declarations

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/css-declarations.svg

[codecov]: https://codecov.io/github/wooorm/css-declarations

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[warning]: #function-warningreason-offset

[css]: https://github.com/reworkcss/css
