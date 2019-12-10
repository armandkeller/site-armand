'use strict';

var Palette = function (pen) {

    this.slate = new Slate(pen);
    this.colorChoosing = new colorChoosing(pen);
    this.palette = document.getElementById('palette');
    this.context = this.palette.getContext('2d');
    this.feature = document.getElementById('feature');
    this.ctx = this.feature.getContext('2d');
    this.pen = pen;


    this.memoryPointX = 'clientX';
    this.memoryPointY = 'clientY';

    var gradient = this.context.createLinearGradient(250,0,0,0);
    gradient.addColorStop(0,"rgb(255,0,0)");
    gradient.addColorStop(0.17,"rgb(255,255,0)");
    gradient.addColorStop(0.33,"rgb(0,255,0)");
    gradient.addColorStop(0.5,"rgb(0,255,255)");
    gradient.addColorStop(0.67,"rgb(0,0,255)");
    gradient.addColorStop(0.84,"rgb(255,0,255)");
    gradient.addColorStop(1,"rgb(255,0,0)");
    this.context.fillStyle = gradient;
    this.context.fillRect(0,0,250,250);

    gradient = this.context.createLinearGradient(0,0,0,250);
    gradient.addColorStop(0,"rgba(255,255,255,1)");
    gradient.addColorStop(0.5,"rgba(255,255,255,0)");
    gradient.addColorStop(0.5,"rgba(0, 0, 0, 0)");
    gradient.addColorStop(1,"rgba(0,0,0,1)");
    this.context.fillStyle = gradient;
    this.context.fillRect(0,0,250,250);

    this.palette.addEventListener('click', this.onChangePaletteColor.bind(this));
};

Palette.prototype.onChangePaletteColor = function (event) {

    var rectangle = this.palette.getBoundingClientRect();

    this.memoryPointX = event.clientX - rectangle.left;
    this.memoryPointY = event.clientY - rectangle.top;

    var pixels = this.context.getImageData(this.memoryPointX,this.memoryPointY,1,1);
    var pixel=pixels.data;
    this.pen.setColor('rgb(' +pixel[0] + ',' + pixel[1]+ ',' + pixel[2]+')');

    this.colorChoosing.context.fillStyle = this.pen.color;
    this.colorChoosing.context.fillRect(0, 0, 50, 50);
    this.slate.currentFeature();


};
