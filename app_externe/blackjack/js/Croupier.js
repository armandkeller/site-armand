'use strict';

var Croupier = function () {

    this.card = [];
    this.money = 1000;
    this.totalValueCard = 0;



};

Croupier.prototype.totalValue = function () {
    this.totalValueCard = 0;
    for (var i = 0; i < this.card.length; i++) {
        this.totalValueCard += this.card[i]['value'];
    }
    return this.totalValueCard;
};