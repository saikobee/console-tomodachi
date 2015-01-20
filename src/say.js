'use strict';

var fg = require('./fg');
var bg = require('./bg');
module.exports = function() {
    var args = [].slice.call(arguments);
    var s = ' ' + args.join(' ') + ' ';
    console.log(
        '  ' +
        fg.BLACK +
        bg.GRAY +
        s +
        bg.CLEAR
    );
};
