'use strict'

var mongoose = require('mongoose');
require('Salary');
var conn = require('../util/config').database;

var schemaTimekeeping = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
    date: { type: Date, default:  Date.now() },
    salary : {type : [Salary]}
}, { toJSON: { virtuals: true } });

var Timekeeping = conn.model('Timekeeping', schemaTimekeeping, 'Timekeeping');
module.exports = exports = Timekeeping;
