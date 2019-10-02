'use strict'

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var conn = require('../util/config').database;
require('Ingredient');

var schemaCakeMaking = new mongoose.Schema({
    cake: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Cake' },
    date: { type: Date, default: Date.now() },
    quantity: { type: Number, min: 0 },
    ingredients: { type: [Ingredient] },
    cost: { type: mongoose.Schema.Types.Double, min: 0 }
}, { toJSON: { virtuals: true } });

var CakeMaking = conn.model('CakeMaking', schemaCakeMaking, 'CakeMaking');
module.exports = exports = CakeMaking;
