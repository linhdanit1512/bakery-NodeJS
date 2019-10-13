'use strict'

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var conn = require('../util/config').database;

var schemaStatistic = new mongoose.Schema({
    title : {type :String},
    date : {type : Date, default: Date.now()},
    total_revenue: {type : mongoose.Schema.Types.Double, min:0, default:0},
    total_expenditure: {type : mongoose.Schema.Types.Double, min:0, default:0},
    total_expiry: {type : mongoose.Schema.Types.Double, min:0, default:0},
    profit : {type : mongoose.Schema.Types.Double, min:0, default:0},
    detail: {type : [{
        cakeID : mongoose.Schema.Types.ObjectId,
        profit : Number
    }]},
    type : {type : Number, default: 1} //1: day, 2: month, 3: year
}, { toJSON: { virtuals: true } });

schemaCake.virtual('details', { ref: 'Cake', localField: 'detail.cakeID', foreignField: '_id', justOne: false });

var Statistic = conn.model('Statistic', schemaStatistic, 'Statistic');
module.exports = exports = Statistic;
