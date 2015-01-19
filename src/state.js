var fs = require('fs');

var file = '/tmp/console-tomodachi.json';
var utf8 = 'utf-8';

function reviver(key, val) {
    if (/time$/i.test(key)) {
        return new Date(val);
    }
    return val;
}

function save(data) {
    data.lastPokeTime = new Date();
    var json = JSON.stringify(data, null, 4) + '\n';
    fs.writeFileSync(file, json, utf8);
}

function load() {
    try {
        var json = fs.readFileSync(file, utf8);
        var obj = JSON.parse(json, reviver);
        return obj;
    } catch (e) {
        return {
            lastPokeTime: new Date(),
            happiness: 10,
            fullness: 10
        };
    }
}

module.exports = {
    save: save,
    load: load
};
