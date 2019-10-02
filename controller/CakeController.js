require('CommonControl');
require('../util/Slug');
require('./UploadFile');
const mongoose = require('mongoose');

function CakeControl(name) {
    if (!name) name = 'Cake';
    CommonControl.call(this, name);
}

CakeControl.prototype = Object.create(CommonControl.prototype);

CakeControl.prototype._insert = function (data, callback) {
    var _cake = new CakeControl();
    for (var key in data) {
        _cake[key] = data[key];
    }
    if (!data.slug) {
        data.slug = new Slug().slug(data.name);
    }
    if (!['Valid', 'Stop', 'Sold'].includes(data.status)) {
        data.status = 'Valid';
    }

    if (data.img) {
        new UploadFile(data.img, 'cake', function (img) {
            if (!img) {
                delete data.img;
            } else {
                data.img = img;
            }
            _cake.save(function (error, data) {
                callback(error, data);
            });
        });
    }

}

CakeControl.prototype._update = function (data, callback) {
    if (!data.slug) {
        data.slug = new Slug().slug(data.name);
    }

    if (data.img) {
        new UploadFile(data.img, 'cake', function (img) {
            if (!img) {
                delete data.img;
            } else {
                data.img = img;
            }
            CakeControl.update({ id: new mongoose.Types.ObjectId(data.id) }, { $set: data }).exec(function (error, result) {
                if (callback) callback(error, result);
            });
        });
    }

}