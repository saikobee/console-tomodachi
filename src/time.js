// var DELTA_MIN = minutes(10);
var DELTA_MIN = seconds(0.50);

function minutes(n) { return seconds(n * 60); }
function seconds(n) { return n * 1000; }

var now = Object.freeze(new Date());

function diff(t) {
    return now - t;
}

function tooSoon(t) {
    return diff(t) < DELTA_MIN;
}

module.exports = {
    diff: diff,
    now: now,
    tooSoon: tooSoon
};
