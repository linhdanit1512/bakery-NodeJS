'use strict'

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var conn = require('../util/config').database;

var schemaSalary = new mongoose.Schema({
    wage: { type: mongoose.Schema.Types.Double, min: 0 },
    date: { type: Date, default: Date.now() },
    time: { type: Number, min: 1 }
}, { toJSON: { virtuals: true } });

var Salary = conn.model('Salary', schemaSalary, 'Salary');
module.exports = exports = Salary;
