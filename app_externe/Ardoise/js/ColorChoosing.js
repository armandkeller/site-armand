'use strict';

var colorChoosing = function (pen) {

    this.slate = new Slate(pen);
    this.colorChoosing = document.getElementById('colorChoose');
    this.context = this.colorChoosing.getContext('2d');
    this.pen = pen;

    $('i').on('click', this.getColor.bind(this));
};

colorChoosing.prototype.getColor = function (event) {

    this.pen.setColor($(event.currentTarget).data('color'));
    this.context.fillStyle = this.pen.color;
    this.context.fillRect(0, 0, 50, 50);
    this.slate.currentFeature();

};

colorChoosing.prototype.colorNow = function () {

    this.context.fillStyle = this.pen.color;
    this.context.fillRect(0, 0, 50, 50);

};
