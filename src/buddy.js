var random = require('lodash-node/modern/utilities/random.js');
var path = require('path');
var fs = require('fs');

var UTF_8 = 'utf-8';

var fg = require('./fg');
var bg = require('./bg');
var clamp = require('./clamp');
var say = require('./say');
var time = require('./time');
var state = require('./state');

var data = {};

function sleep() {
    state.save(data);
}

function awake() {
    data = state.load();
    // if (time.diff(data.lastPokeTime) > 1) {
    //     data.fullness--;
    //     data.happiness--;
    // }
    normalize(data);
}

function normalize(data) {
    data.fullness = Math.max(0, data.fullness);
    data.happiness = Math.max(0, data.happiness);
}

function worriedAboutBeingAnnoying() {
    // return true;
    // return false;
    return time.tooSoon(data.lastPokeTime);
    // return time.tooSoon(data.lastPokeTime)
    //     || random(100) < 90;
}

function barGraph(name, n, max, color) {
    var m = max - n;
    var PX = '   ';
    var s = '';
    // s += '  ';
    s += bg.GRAY;
    s += fg.BLACK;
    s += ' ';
    s += name;
    s += ' ';
    s += bg.CLEAR;
    s += ' ';
    while (n --> 0) {
        s += color;
        s += PX;
        // s += bg.CLEAR;
        // s += ' ';
    }
    while (m --> 0) {
        s += bg.GRAY;
        s += PX;
        // s += bg.CLEAR;
        // s += ' ';
    }
    s += bg.CLEAR;
    return s;
}

function sayStats() {
    var hap = barGraph('HAP', data.happiness, 10, bg.GREEN);
    var ful = barGraph('FUL', data.fullness, 10, bg.ORANGE);

    console.log(hap);
    console.log(ful);

    console.log('');
}

function appear() {
    var f = path.join('ansi', 'cat-happy.ansi');
    console.log(fs.readFileSync(f, UTF_8));
    sayStats();
}

function poke() {
    // TODO: `poke` is the function that gets called often, such as in a shell
    // pre-prompt function. It should have a small chance of making the buddy
    // show up.
    if (worriedAboutBeingAnnoying()) { return; }
    console.log('');
    sayStats();
    // if (data.fullness < 2) { complain(); }
    say('Nice to see you again!');
}

function feed() {
    // TODO: `feed` should make the buddy show up eating some food, thanking
    // you for it, and gaining HP or something.
    data.fullness = 10;
    data.happiness = 10;
    say('Thanks for feeding me!');
}

function showBuddyState(buddy, state) {
    var f = path.join('ansi', buddy + '-' + state + '.ansi');
    var ansi = fs.readFileSync(f, UTF_8);
    console.log(ansi);
}

module.exports = {
    appear: appear,
    poke: poke,
    feed: feed,
    sleep: sleep,
    awake: awake
};
