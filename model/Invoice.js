'use strict'

var mongoose = require('mongoose');
var conn = require('../util/config').database;
require('CakeSelling');
require('Promotion')

var schemaInvoice = new mongoose.Schema({
    name: { type: String },
    time: { type: Date },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
    cakes: { type: [CakeSelling] }
}, { toJSON: { virtuals: true } });

schemaInvoice.virtual('cakeList', { ref: 'CakeSell', localField: '_id', foreignField: 'Invoice', justOne: false });

var Invoice = conn.model('Invoice', schemaInvoice, 'Invoice');
module.exports = exports = Invoice;
