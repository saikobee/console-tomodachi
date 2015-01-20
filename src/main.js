'use strict';

var Buddy = require('./buddy');
var state = require('./state');

var UTF_8 = 'utf-8';
var args = process.argv.slice(2);

var helpNames = {
    help: showHelp,
    '-h': showHelp,
    '--help': showHelp
};

function showHelp() {
    // TODO: Show useful help
    console.error('I wish I could help you.');
}

function main() {
    var cmd = args[0];
    var rest = args.slice(1);
    var tomodachi = new Buddy(state.load());
    if (!cmd || helpNames[cmd] || !tomodachi[cmd]) {
        showHelp();
    } else {
        tomodachi[cmd]();
        state.save(tomodachi.toJSON());
    }
}

module.exports = main;
