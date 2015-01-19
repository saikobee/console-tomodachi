'use strict';

module.exports = function chomp(s) {
    var i = s.length - 1;
    var c = s.charAt(i);
    return c === '\n'
        ? s.slice(0, i)
        : s;
};
