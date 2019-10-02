'use strict'

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var conn = require('../util/config').database;

var schemaCake = new mongoose.Schema({
    name: { type: String, require: true },
    img: { type: String, default: '/img/product/no-image.png' },
    description: { type: String, maxlength: 2000 },
    price: { type: mongoose.Schema.Types.Double, default: 0, min: 0 },
    expiry_date: { type: Number, min: 1, default: 1 },
    slug: { type: String },
    cake_type: {type : String},
    status: { type: String, default: 'Valid' },//Valid, Stop, Sold, Expired
}, { toJSON: { virtuals: true } });

schemaCake.virtual('ingredients', { ref: 'CakeMaking', localField: '_id', foreignField: 'cake', justOne: false });
schemaCake.virtual('discounts', { ref: 'Promotion', localField: '_id', foreignField: 'value.cake', justOne: false });

var Cake = conn.model('Cake', schemaCake, 'Cake');
module.exports = exports = Cake;
