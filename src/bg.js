'use strict';

var escaped = require('./escaped');
var bg_256 = require('./bg-256');

module.exports = {
    RED: bg_256(0xcc, 0x00, 0x00),
    GRAY: bg_256(0xaa, 0xaa, 0xaa),
    ORANGE: bg_256(0xcc, 0xaa, 0x00),
    GREEN: bg_256(0x00, 0xaa, 0x00),
    BLUE: bg_256(0x00, 0x00, 0xaa),
    CLEAR: escaped(0),
    BOLD: escaped(1)
};
