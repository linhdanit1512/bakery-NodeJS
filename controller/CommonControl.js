function CommonControl(object) {
    require('../model/' + object);
}

CommonControl.prototype = {
    /**
     * 
     * @param {ObjectId} _id object id need to find
     * @param {function} callback 
     */
    _findById: function (_id, callback) {
        this.findById(_id, function (error, ob) {
            callback(error, ob);
        });
    },
    _findOne: function (params, callback) {
        this.findOne(params, function (error, data) {
            callback(error, data);
        });
    },
    _findForPage: function (option, callback) {
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
    },
    _delete: function (params, callback) {
        const removedCount = this.remove(params);
        callback(removedCount);
    },

    _searchAll: function (term, callback) {
        this.find({ $text: { $search: term } }).exec(function (error, data) {
            callback(error, data);
        })
    },

    _search: function (params, callback) {
        var where = {};
        for (var key in params) {
            where[key] = { $regex: '.*' + params[key] + '.*' }
        }

        this.find(where).exec(function (error, data) {
            callback(error, data);
        })
    }
}

module.exports = exports = CommonControl