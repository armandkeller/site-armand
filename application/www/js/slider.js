'use strict';

$(function () {
    var index = 0;
    var slider = [
        'application/www/img/slider/slider.jpg',
        'application/www/img/slider/slider1.jpg',
        'application/www/img/slider/slider2.jpg',
        'application/www/img/slider/slider3.jpg'
    ];

    function showImage() {

        $('.slider').attr('src', slider[index]);

    }

    function goToNextSlide() {

        index++;

        if (index === slider.length){
            index = 0;
        }
        showImage();
    }

    function start() {
        window.setInterval(goToNextSlide, 5000);
    }

    showImage();
    start();

});