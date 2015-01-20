'use strict';

var fg_256 = require('./fg-256');

module.exports = {
    RED: fg_256(0x66, 0x00, 0x00),
    BLACK: fg_256(0x00, 0x00, 0x00),
    WHITE: fg_256(0xff, 0xff, 0xff)
};
