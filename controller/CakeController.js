
var Slug = require('../util/Slug');
var CakeController = require('../model/Cake');
const UploadFile = require('./UploadFile');
const mongoose = require('mongoose');

CakeController.constructor = CakeController;


/**
 * 
 * @param {ObjectId} _id object id need to find
 * @param {function} callback 
 */
CakeController._findById = function (_id, callback) {
    this.findById(_id, function (error, ob) {
        callback(error, ob);
    });
}
CakeController._findOne = function (params, callback) {
    this.findOne(params, function (error, data) {
        callback(error, data);
    });
}
CakeController._findForPage = function (option, callback) {
    if (!option) option = {};
    if (!option.page) option.page = 0;
    if (!option.quantity) option.quantity = 10;
    if (!option.where) option.where = {};
    this.find(option.where).
        skip(option.page * option.quantity).
        limit(option.quantity).
        exec(function (error, data) {
            callback(error, data);
        });
}
CakeController._delete = function (params, callback) {
    const removedCount = this.remove(params);
    callback(removedCount);
}

CakeController._searchAll = function (term, callback) {
    this.find({ $text: { $search: term } }).exec(function (error, data) {
        callback(error, data);
    });
}

CakeController._search = function (params, callback) {
    var where = {};
    for (var key in params) {
        where[key] = { $regex: '.*' + params[key] + '.*' }
    }

    this.find(where).exec(function (error, data) {
        callback(error, data);
    })
}
CakeController._insert = function (data, callback) {
    var _cake = new CakeController();
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
CakeController._update = function (data, callback) {
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
            CakeController.update({ id: new mongoose.Types.ObjectId(data.id) }, { $set: data }).exec(function (error, result) {
                if (callback) callback(error, result);
            });
        });
    }
}

module.exports = exports = CakeController;