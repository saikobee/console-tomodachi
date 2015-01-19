'use strict';

function hours(n)   { return minutes(n * 60); }
function minutes(n) { return seconds(n * 60); }
function seconds(n) { return n * 1000; }

var now = Object.freeze(new Date());

function atLeast(t) {
    return {
        since: function(d) {
            return (now - d) >= t;
        }
    };
}

module.exports = {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    atLeast: atLeast,
    now: now
};
