'use strict';

module.exports = function clamp(x, a, b) {
    return Math.min(Math.max(x, a), b);
};
