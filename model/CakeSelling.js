'use strict'

function CakeSelling(option) {
    if(!option) option = {};
    if(!option.serviceFee) option.serviceFee = 0;
    if(!option.price) option.price = 0;
    
    this.cake = option.cakeMakingID;
    this.quantity = option.quantity;
    this.serviceFee = option.serviceFee;
    this.price = option.price;
    this.totalPrice = option.totalPrice
}

CakeSelling.prototype = {
    constructor : CakeSelling
}
module.exports = exports = CakeSelling;
