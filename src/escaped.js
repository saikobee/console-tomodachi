'use strict';

module.exports = function escaped(s) {
    var s = [].join.call(arguments, ';');
    return '\u001b[' + s + 'm';
};
