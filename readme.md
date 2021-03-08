# css-declarations

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Parse and stringify CSS declarations (such as the HTML `style` attribute).

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install css-declarations
```

## Use

```js
import {parse, stringify} from 'css-declarations'

var values = parse(`
  color:/*red*/purple;
  -webkit-border-radius: 3px !important;;
`)
// => {color: 'purple', webkitBorderRadius: '3px !important'}

stringify(values)
// => 'color: purple; -webkit-border-radius: 3px !important;'
```

## API

This package exports the following identifiers: `parse`, `stringify`.
There is no default export.

### `parse(value[, options])`

Parse CSS declarations from `string` to `object`.

###### `options.warning`

When given, `warning` is called when an error is encountered
([`Function`][warning]).

###### Returns

`Object.<string>` — Declarations.

### `stringify(values)`

Serialize CSS declarations from `object` to `string`.

###### Returns

`string` — Serialized declarations.

### `function warning(reason, offset)`

Invoked when an error occurs.
Errors come from [`reworkcss/css`][css].

###### Parameters

*   `reason` (`string`) — English reason for error;
*   `offset` (`number`) — Index-based position of error.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/wooorm/css-declarations/workflows/main/badge.svg

[build]: https://github.com/wooorm/css-declarations/actions

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
