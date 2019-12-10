'use strict';

var FeatureChoosing = function (pen) {

    this.slate = new Slate(pen);
    this.featureChoosing = document.getElementById('feature');
    this.context = this.featureChoosing.getContext('2d');
    this.pen = pen;

    $('button.trait').on('click', this.getFeature.bind(this));
};

FeatureChoosing.prototype.getFeature = function (event) {

    this.context.clearRect(0, 0, 100, 100);
    this.pen.setSize($(event.currentTarget).data('trait'));

    this.slate.currentFeature();
};

FeatureChoosing.prototype.featureNow = function () {

    this.context.fillStyle = this.pen.color;
    this.context.fillRect(0, 25, 100, this.pen.size);

};