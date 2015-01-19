'use strict';

var fs = require('fs');
var assign = require('lodash-node/modern/objects/assign');

var file = '/tmp/tomo.json';
var UTF_8 = 'utf-8';

function reviver(key, val) {
    if (/time$/i.test(key)) {
        return new Date(val);
    }
    return val;
}

function save(data) {
    var newData = assign({}, data, {
        version: 1,
        bedTime: new Date()
    });
    var json = JSON.stringify(newData, null, 4) + '\n';
    fs.writeFileSync(file, json, UTF_8);
}

function load() {
    try {
        var json = fs.readFileSync(file, UTF_8);
        var obj = JSON.parse(json, reviver);
        return obj;
    } catch (e) {
        return Object.freeze({
            version: 1,
            bedTime: new Date(),
            fullness: 10
        });
    }
}

module.exports = {
    save: save,
    load: load
};
