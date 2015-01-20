'use strict';

var fs = require('fs');

var resource = require('./resource');
var clamp = require('./clamp');
var say = require('./say');
var time = require('./time');

var UTF_8 = 'utf-8';
var NAP_LENGTH = time.minutes(1);
var RATE_HUNGER = time.minutes(0);
var MAX_FULLNESS = 10;

function appear() {
    var f = resource(
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
