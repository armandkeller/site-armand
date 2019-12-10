'use strict';

var Snake = function () {

    this.c = document.getElementById('grill');
    this.ctx = this.c.getContext('2d');
    this.rectangle = this.c.getBoundingClientRect();
    this.jsonData = JSON.parse(window.localStorage.getItem('score'));
    this.ini = [[200,200]];
    this.run = null;
    this.alea = [];
    this.newApple = [];
    this.directional = null;
    this.memory = null;
    this.score = 0;

    document.addEventListener('keydown', this.update.bind(this));
    $('p.score span').text(this.score);
    if (this.jsonData === null) {
        this.jsonData = 0;
    }
    $('p.newScore span').text(this.jsonData);
};

Snake.prototype.generate = function (min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Snake.prototype.rand = function () {
    for (var i = 0; i < this.c.width; i += 20) {
        this.alea.push(i);
    }
};

Snake.prototype.createApple = function () {
    this.newApple.push(this.alea[this.generate(0,this.alea.length - 1)]);
    this.newApple.push(this.alea[this.generate(0,this.alea.length - 1)]);
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.newApple[0], this.newApple[1],20,20);
};

Snake.prototype.draw = function () {
    var objS = this;
    objS.advance();
    objS.rect();

};

Snake.prototype.rect = function () {
    for (var i = 0; i < this.ini.length; i++) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.ini[i][0],this.ini[i][1],20,20);
    }
};

Snake.prototype.advance = function () {
    this.ctx.clearRect(0,0,this.c.width, this.c.height);
    var next = this.ini[0].slice();
    switch (this.memory) {
        case 38:
            next[1] -= 20;
            break;
        case 39:
            next[0] += 20;
            break;
        case 40:
            next[1] += 20;
            break;
        case 37:
            next[0] -= 20;
            break;
    }
    this.ini.unshift(next);
    this.ini.pop();
    this.eating();
    this.takeAWall();
    this.autoEating();
};

Snake.prototype.eating = function () {
    if (this.ini[0][0] === this.newApple[0] && this.ini[0][1] === this.newApple[1]) {
        this.newApple = [];
        this.ini.push([]);
        this.rand();
        this.createApple();
        this.score++;
        $('p.score span').text(this.score);
    }
};

Snake.prototype.takeAWall = function () {
    if (this.ini[0][0] < 0 || this.ini[0][1] >= this.c.height || this.ini[0][0] >= this.c.width || this.ini[0][1] < 0) {
        clearInterval(this.run);
        alert('perdu ! Appuyez sur ok pour recommencer');
        if (this.score > this.jsonData) {
            this.saveData();
        }
        window.location.reload();
    }
};

Snake.prototype.autoEating = function () {
    for (var i = 2; i < this.ini.length; i++){
        if(this.ini[0][0] === this.ini[i][0] && this.ini[0][1] === this.ini[i][1]) {
            clearInterval(this.run);
            alert('perdu ! Appuyez sur ok pour recommencer');
            if (this.score > this.jsonData) {
                this.saveData();
            }
            window.location.reload();
        }
    }
};

Snake.prototype.saveData = function () {
    var data = JSON.stringify(this.score);
    window.localStorage.setItem('score', data);
};

Snake.prototype.update = function (e) {
    e.preventDefault();
    this.directional = e.keyCode;
    var objS = this;
    this.createApple();
    switch (this.directional) {
        case 38:
            if (this.directional !== this.memory && this.memory !== 40) {
                clearInterval(this.run);
                objS.draw();
                objS.createApple();
                this.run = setInterval(function () {
                    objS.draw();
                    objS.createApple();
                }, 100);
                this.memory = this.directional;
            }
            break;
        case 39:
            if (this.directional !== this.memory && this.memory !== 37) {
                clearInterval(this.run);
                objS.draw();
                objS.createApple();
                this.run = setInterval(function () {
                    objS.draw();
                    objS.createApple();
                }, 100);
                this.memory = this.directional;
            }
            break;
        case 40:
            if (this.directional !== this.memory && this.memory !== 38) {
                clearInterval(this.run);
                objS.draw();
                objS.createApple();
                this.run = setInterval(function () {
                    objS.draw();
                    objS.createApple();
                }, 100);
                this.memory = this.directional;
            }
            break;
        case 37:
            if (this.directional !== this.memory && this.memory !== 39) {
                clearInterval(this.run);
                objS.draw();
                objS.createApple();
                this.run = setInterval(function () {
                    objS.draw();
                    objS.createApple();
                }, 100);
                this.memory = this.directional;
            }
            break;
    }
};

Snake.prototype.start = function () {
    this.rect(this.ini[0], this.ini[1]);
    this.rand();
    this.createApple();
};