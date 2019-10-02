'use strict'

function CakeSelling(cakeMakingID, quantity, price) {
    this.cake = cakeMakingID;
    this.quantity = quantity;
    this.price = price;
}

CakeSelling.prototype = {
    constructor : CakeSelling
}
module.exports = exports = CakeSelling;
