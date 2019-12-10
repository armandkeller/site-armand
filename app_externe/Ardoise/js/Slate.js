'use strict';

var Slate = function (pen) {

    this.canvas = document.getElementById('mySlate');
    this.context = this.canvas.getContext('2d');
    this.feature = document.getElementById('feature');
    this.ctx = this.feature.getContext('2d');

    this.memoryPointX = 'clientX';
    this.memoryPointY = 'clientY';
    this.isDrawing = false;

    this.pen = pen;

    //installation des gestionnaires d'événement de l'ardoise
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));

};

Slate.prototype.onMouseDown = function (event) {

    var rectangle = this.canvas.getBoundingClientRect();

    this.memoryPointX = event.clientX - rectangle.left;
    this.memoryPointY = event.clientY - rectangle.top;
    this.isDrawing = true;

};

Slate.prototype.onMouseLeave = function () {

    this.isDrawing = false;

};

Slate.prototype.onMouseUp = function () {

    this.isDrawing = false;

};

Slate.prototype.onMouseMove = function (event) {

    if (this.isDrawing) {

        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.beginPath();
        this.context.moveTo(this.memoryPointX, this.memoryPointY);

        var rectangle = this.canvas.getBoundingClientRect();

        this.memoryPointX = event.clientX - rectangle.left;
        this.memoryPointY = event.clientY - rectangle.top;

        this.context.lineTo(this.memoryPointX, this.memoryPointY);
        this.context.closePath();
        this.context.lineWidth = this.pen.size;
        this.context.strokeStyle = this.pen.color;
        this.context.stroke();
    }
};

Slate.prototype.onClearSlate = function() {

    this.context.clearRect(0, 0, 640, 480);

};

Slate.prototype.onChangeTrait = function(event) {

    this.pen.setSize($(event.currentTarget).data('trait'));

};

Slate.prototype.onChangeColor = function(event) {

    this.pen.setColor($(event.currentTarget).data('color'));

};

Slate.prototype.currentFeature = function () {

    switch (this.pen.size) {
        case 1:
            this.ctx.fillStyle = this.pen.color;
            this.ctx.fillRect(0, 25, 100, this.pen.size);
            break;

        case 5:
            this.ctx.fillStyle = this.pen.color;
            this.ctx.fillRect(0, 23, 100, this.pen.size);

            break;

        case 15:
            this.ctx.fillStyle = this.pen.color;
            this.ctx.fillRect(0, 20, 100, this.pen.size);
            break;
    }

};
