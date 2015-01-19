'use strict';

var path = require('path');
var fs = require('fs');

var UTF_8 = 'utf-8';

var fg = require('./fg');
var bg = require('./bg');
var clamp = require('./clamp');
var say = require('./say');
var time = require('./time');
var state = require('./state');

var NAP_LENGTH = time.minutes(1);
var RATE_HUNGER = time.minutes(0);
var MAX_FULLNESS = 10;

function appear() {
    var f = path.join(
        'ansi',
        this.type + '-' +
        this.emotion + '.ansi'
    );
    console.log(fs.readFileSync(f, UTF_8));
    this.sayStats();
}

function sayStats() {
    console.log('FULLNESS: ' + this.fullness + ' / ' + MAX_FULLNESS);
    console.log('');
}

function poke() {
    if (this.tired) {
        return;
    }
    if (this.hungry) {
        this.fullness = clamp(this.fullness - 1, 0, MAX_FULLNESS);
    }
    this.appear();
    say('Hello!');
}

function feed() {
    this.fullness = MAX_FULLNESS;
    this.appear();
    say('Thanks for feeding me!');
}

function showBuddyState(buddy, state) {
    var f = path.join('ansi', buddy + '-' + state + '.ansi');
    var ansi = fs.readFileSync(f, UTF_8);
    console.log(ansi);
}

function toJSON() {
    return {
        fullness: this.fullness,
        bedTime: this.bedTime,
    };
}

function Buddy(data) {
    this.type = 'cat';
    this.emotion = 'happy';
    this.fullness = data.fullness;
    this.bedTime = data.bedTime;
    this.hungry = time.atLeast(RATE_HUNGER).since(this.bedTime);
    this.tired = !time.atLeast(NAP_LENGTH).since(this.bedTime);
    this.poke = poke.bind(this);
    this.feed = feed.bind(this);
    this.appear = appear.bind(this);
    this.sayStats = sayStats.bind(this);
    this.toJSON = toJSON.bind(this);
}

module.exports = Buddy;
