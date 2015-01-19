var chomp = require('./chomp');
module.exports = function lines(s) {
    return chomp(s).split('\n');
};
