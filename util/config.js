'use strict'
var mongoose = require('mongoose');
require('dotenv').config();
var options = {
    poolSize: 20,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: 30, // trying to reconnect
    reconnectInterval: 500 // Reconnect every 500ms
}

var database = mongoose.createConnection(process.env.DB_HOST, options);
module.exports = exports = {
    database: database,
    collection_name: ['Cake', 'CakeMaking', 'CakeSelling', 'Ingredient', 'UsedIngredient', 'Timekeeping']
    
}