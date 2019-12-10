'use strict';

var Player = function () {

    this.money = 100;
    this.card = [];
    this.totalValueCard = 0;
    this.setting = 0;

};

Player.prototype.totalValue = function () {
    this.totalValueCard = 0;
    for (var i = 0; i < this.card.length; i++) {
        this.totalValueCard += this.card[i]['value'];
    }
    return this.totalValueCard;
};

Player.prototype.showCard =  function () {
    var result = '';
    for(var i = 0; i < this.card.length; i++) {
        result += this.card[i]['name'] + ', ';
    }
    return result;
};