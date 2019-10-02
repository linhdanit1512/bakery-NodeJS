'use strict'

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var conn = require('../util/config').database;

var schemaIngredient = new mongoose.Schema({
    name: { type: String, require: true, default: 'Unknown' },
    create_date: { type: Date, default:  Date.now() },
    input_date: { type: Date, default:  Date.now() },
    cost : {type : mongoose.Schema.Types.Double, default : 0},
    expired_date: { type: Date },
    slug: { type: String },
    status: { type: String, default: 'on' }
}, { toJSON: { virtuals: true } });

var Ingredient = conn.model('Ingredient', schemaIngredient, 'Ingredient');
module.exports = exports = Ingredient;
