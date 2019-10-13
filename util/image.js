var jimp = require('jimp');
var random = require('randomstring');
let prePath = 'public/img/';
module.exports = exports = {

    resize: function (path, width, height, newpath) {
        jimp.read(prePath + path).then(image => {
            image.rgba(true);
            image.resize(width, height).quality(80).write(prePath + newpath);
        }).catch(e => {
            console.log(e);
        });
    },

    autoHeight: function (path, width, newpath) {
        jimp.read(prePath + path).then(image => {
            image.rgba(true);
            image.resize(width, jimp.AUTO).quality(80).write(prePath + newpath);
        }).catch(e => {
            console.log(e);
        })
    },
    autoWidth: function (path, height, newpath) {
        jimp.read(prePath + path, function (e, image) {
            if (e) console.log(e);
            else image.resize(jimp.AUTO, height).quality(80).write(prePath + newpath);
        });
    },

    sepia: function (path, newpath) {
        jimp.read(prePath + path, function (e, image) {
            if (e) console.log(e);
            else image.sepia().quality(80).write(newpath);
        });
    },

    crop: function (path, x, y, w, h, newpath) {
        jimp.read(prePath + path, function (e, image) {
            if (e) console.log(e);
            else image.crop(x, y, w, h).quality(80).write(prePath + newpath);
        });
    },

    load: {
        resize: function (image, width, height) {
            var newLink = random.generate(20) + '.png';
            jimp.read(image).then(image => {
                image.resize(width, height).quality(80).write(prePath + 'crop/' + newLink);
                return newLink;
            }).catch(function (e) {

            });
        },
        crop: function (image, x, y, w, h, newLink) {
            jimp.read(image).then(image => {
                image.crop(x, y, w, h).quality(80).write(prePath + 'crop/' + newLink);
                return newLink;
            }).catch(function (e) {

            });
        }
    }
}
