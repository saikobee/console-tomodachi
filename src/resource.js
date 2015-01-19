var path = require('path');

module.exports = function() {
    var args = [].slice.call(arguments);
    var pieces = [__dirname, '..'].concat(args);
    return path.join.apply(null, pieces);
};
