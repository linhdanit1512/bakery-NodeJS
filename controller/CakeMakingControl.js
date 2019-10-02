require('CommonControl');

const mongoose = require('mongoose');
function CakeMakingControl(name){
    if(!name) name= 'CakeMaking';
    CommonControl.call(this, name);
}

CakeMakingControl.prototype = Object.create(CommonControl.prototype);

CakeMakingControl.prototype._insert = function(data, callback){
    CakeMakingControl.find()
}

CakeMakingControl.prototype._update = function(data, callback){
    CakeMakingControl.update({id: new mongoose.Types.ObjectId(data.id)}, {$set:data}).exec(function(error, result){
        if(callback) callback(error, result);
    });
}

