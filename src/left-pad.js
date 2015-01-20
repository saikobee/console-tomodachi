'use strict';

module.exports = function(pad, s) {
    return s
        .split('\n')
        .map(function(line) { return pad + line; })
        .join('\n');
};
