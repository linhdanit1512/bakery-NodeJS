'use strict'
var mongoose = require('mongoose');
require('dotenv').config();
var options = {
    poolSize: 20,
    reconnectTries: 30, // trying to reconnect
    reconnectInterval: 500 // Reconnect every 500ms
}

var database = mongoose.createConnection(process.env.DB_HOST, options);
function stringConvert(st){
    
}
module.exports = exports = {
    database : database,
    collection_name : ['Cake', 'CakeMaking', 'CakeSelling', 'Ingredient', 'UsedIngredient', 'Timekeeping'],
    
}