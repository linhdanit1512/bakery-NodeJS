require('CommonControl');
require('../util/Slug');
const mongoose = require('mongoose');
function IngredientControl(name) {
    if (!name) name = 'Incredient';
    CommonControl.call(this, name);
}

IngredientControl.prototype = Object.create(CommonControl.prototype);

IngredientControl.prototype._insert = function (data, callback) {
    var _ingredient = new IngredientControl();
    for (var key in data) {
        _ingredient[key] = data[key];
    }
    if (!data.slug) {
        data.slug = new Slug().slug(data.name);
    }

    _ingredient.save(function (error, data) {
        callback(error, data);
    })
}

IngredientControl.prototype._update = function (data, callback) {
    if (!data.slug) {
        data.slug = new Slug().slug(data.name);
    }

    IngredientControl.update({ id: new mongoose.Types.ObjectId(data.id) }, { $set: data }).exec(function (error, result) {
        if (callback) callback(error, result);
    });
}

IngredientControl.prototype.searchForSelect = function (params, callback) {
    var where = {};
    for (var key in params) {
        where[key] = { $regex: '.*' + params[key] + '.*' }
    }
    var recentDate = new Date().removeMinutes(minutesSinceLast);
    where.expired_date = { $gte: recentDate };

    this.find(where).
        select('_id name slug cost expired_date').
        sort({ name: 1, cost: 1 }).
        exec(function (error, data) {
            callback(error, data);
        });
}

