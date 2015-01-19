#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var imgcat = require('img-cat');

var UTF_8 = 'utf-8';

var imgcatOpts = {
    padding: false
};

function dirEach(dir, cb) {
    fs.readdirSync(dir).forEach(cb);
}

dirEach('img', function(buddy) {
    dirEach(path.join('img', buddy), function(img) {
        var state = img.replace('.png', '');
        var file = path.join('img', buddy, img);
        var out = path.join('ansi', buddy + '-' + state + '.ansi');
        imgcat
            .fromFile(file, imgcatOpts)
            .then(function(ansi) {
                fs.writeFileSync(out, ansi, UTF_8);
            });
    });
});
