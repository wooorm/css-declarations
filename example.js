// Dependencies:
var cssDeclarations = require('./index.js');

// Parsing:
var values = cssDeclarations.parse(
    'color:/*red*/purple; -webkit-border-radius: 3px !important;;'
);

// Yields:
console.log('js', require('util').inspect(values, {'depth': null}));

// Compiling:
var value = cssDeclarations.stringify(values);

// Yields:
console.log('js', require('util').inspect(value));
