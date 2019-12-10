'use strict';

var Pen = function () {

    this.color = 'black';
    this.size = 1;

};

Pen.prototype.setColor = function (color) {
    this.color = color;
};

Pen.prototype.setSize = function (size) {
    this.size = size;
};

