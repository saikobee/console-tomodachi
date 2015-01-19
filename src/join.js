module.exports = function(sep) {
    return function(xs) {
        return xs.join(sep);
    };
};
