'use strict';

/**
 * Joins two multiline chunks of text horizontally. Both parameters must
 * contain the same number of lines.
 *
 * @example
 * interleave('A\nB\n', 'C\nD\n') === 'AC\nBD\n'
 */
var zip = require('lodash-node/modern/arrays/zip');
var join = require('./join');
var lines = require('./lines');
module.exports = function interleave(blobs) {
    return zip(blobs.map(lines))
        .map(join(''))
        .join('\n');
};
