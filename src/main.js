var path = require('path');
var fs = require('fs');

var imgcat = require('img-cat');

var say = require('./say');
var buddy = require('./buddy');
var interleave = require('./interleave');

var UTF_8 = 'utf-8';
var args = process.argv.slice(2);

var handlers = {
    help: showHelp,
    '-h': showHelp,
    '--help': showHelp,
    poke: buddy.poke,
    feed: buddy.feed,
    'default': buddy.appear
};

function showDefault() {
    showBuddyState('cat', 'happy');
}

function showHelp() {
    // TODO: Show useful help
    console.error('I wish I could help you.');
}

function main() {
    var cmd = args[0];
    var rest = args.slice(1);
    var f;
    buddy.awake();
    if (cmd) {
        f = handlers[cmd] || handlers.help;
    } else {
        f = handlers.default;
    }
    f(rest);
    buddy.sleep();
}

module.exports = main;
