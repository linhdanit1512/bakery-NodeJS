'use strict'

var mongoose = require('mongoose');
var conn = require('../util/config').database;

/*

value: {
    cake: [ObjectId]
    discount : Number,
    discount_type: %, $, unit,
    conditionQuantity: Unlimit/[quantity]
}

*/
var schemaPromotion = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    type: { type: Number },
    start_time: { type: Date, default: Date.now() },
    stop_time: { type: Date, default: Date.now() },
    value: { type: mongoose.Schema.Types.Mixed }
}, { toJSON: { virtuals: true } });

var Promotion = conn.model('Promotion', schemaPromotion, 'Promotion');
module.exports = exports = Promotion;
