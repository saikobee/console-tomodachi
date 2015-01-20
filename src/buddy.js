'use strict';

var fs = require('fs');
var sample = require('lodash-node/modern/collections/sample');

var leftPad = require('./left-pad');
var bg = require('./bg');
var fg = require('./fg');
var resource = require('./resource');
var clamp = require('./clamp');
var say = require('./say');
var time = require('./time');

var UTF_8 = 'utf-8';
var NAP_LENGTH = time.minutes(1);
var RATE_HUNGER = time.minutes(1);
var MAX_FULLNESS = 10;

function appear() {
    var f = resource(
        'ansi',
        this.type + '-' +
        this.emotion + '.ansi'
    );
    var img = fs.readFileSync(f, UTF_8);
    console.log();
    console.log(leftPad('  ', img));
}

function saySomething(category) {
    var data = require('../assets/phrases/default.json');
    this.appear();
    say(sample(data[category]));
}

function poke() {
    if (this.tired) {
        return;
    }
    if (this.hungry) {
        this.fullness = clamp(this.fullness - 1, 0, MAX_FULLNESS);
    }
    if (this.fullness < 9) {
        this.saySomething('hungry');
    } else {
        this.saySomething('random');
    }
}

function feed() {
    this.fullness = MAX_FULLNESS;
    this.saySomething('full');
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
    this.saySomething = saySomething.bind(this);
    this.toJSON = toJSON.bind(this);
}

module.exports = Buddy;
