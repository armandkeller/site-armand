'use strict';

var Program = function () {

    this.pen = new Pen();
    this.canvas = new Slate(this.pen);
    this.palette = new Palette(this.pen);
    this.colorChoosing = new colorChoosing(this.pen);
    this.featureChoosing = new FeatureChoosing(this.pen);

    $('i.clear').on('click', this.canvas.onClearSlate.bind(this.canvas));
    $('.trait button').on('click', this.canvas.onChangeTrait.bind(this.canvas));
    $('.color .fa').on('click', this.canvas.onChangeColor.bind(this.canvas));

    this.colorChoosing.colorNow();
    this.featureChoosing.featureNow();

};
