'use strict'

var mongoose = require('mongoose');
require('Salary');
var conn = require('../util/config').database;

var schemaUser = new mongoose.Schema({
    email: { type: String, require: true, index: { unique: true }, text: true },
    password: { type: String, require: true },
    name: { type: String, text: true },
    address: { type: String, text: true },
    phone: { type: [String], text: true },
    dob: { type: Date },
    type: { type: String },
    status: { type: String, default: 'Active' },
    admin: { type: Boolean, default: false },
    create_date: { type: Date, default: Date.now() },
    image: { type: String },
    salaries: { type: [Salary], default: [] }
}, { toJSON: { virtuals: true } });

var User = conn.model('User', schemaUser, 'User');
module.exports = exports = User;
