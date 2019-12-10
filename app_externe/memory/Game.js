'use strict';

var Game = function () {
    this.symbols = [
        {symbol: '😀', hidden: '❓', finding: false},
        {symbol: '💖', hidden: '❓', finding: false},
        {symbol: '🎉', hidden: '❓', finding: false},
        {symbol: '🎩', hidden: '❓', finding: false},
        {symbol: '🐶', hidden: '❓', finding: false},
        {symbol: '🐱', hidden: '❓', finding: false},
        {symbol: '🦄', hidden: '❓', finding: false},
        {symbol: '🐬', hidden: '❓', finding: false},
        {symbol: '🌍', hidden: '❓', finding: false},
        {symbol: '🌛', hidden: '❓', finding: false},
        {symbol: '🌞', hidden: '❓', finding: false},
        {symbol: '💫', hidden: '❓', finding: false},
        {symbol: '🍎', hidden: '❓', finding: false},
        {symbol: '🍌', hidden: '❓', finding: false},
        {symbol: '🍓', hidden: '❓', finding: false},
        {symbol: '🍐', hidden: '❓', finding: false},
        {symbol: '🍟', hidden: '❓', finding: false},
        {symbol: '🍿', hidden: '❓', finding: false}
    ];
    this.hidden = '❓';
    this.cards = [];
    this.game = $('.game');
    this.random = [];
    this.shuffle = [];
    this.limit = 0;
    this.pair = [];
    this.echec = [];
    this.check = 0;
    this.time = 0;
    this.minute = 0;
    this.chrono = null;
    this.startChono = null;
    this.jsonData = JSON.parse(window.localStorage.getItem('time'));

    $('.seconde').text(0 + '' + this.time);
    $('.minute').text(0 + '' + this.minute + ':');
    if (this.jsonData !== null) {
        $('.score').text(this.jsonData[0] + ' minutes et ' + this.jsonData[1] + ' secondes');
    } else {
        $('.score').text('pas encore défini');
    }

};


Game.prototype.rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Game.prototype.initialize = function () {
    for(var i = 0; i < this.symbols.length; i++) {
        this.cards.push(this.symbols[i], this.symbols[i]);
    }
    return this.cards;
};


Game.prototype.toShuffle = function () {
    while (this.random.length !== this.cards.length) {
        var number = this.rand(0,35);
        if (this.random.indexOf(number) === -1) {
            this.random.push(number);
        }
    }
    for (var i = 0; i < this.random.length; i++) {
        this.shuffle.push(this.cards[this.random[i]])
    }
    for (i = 0; i < this.shuffle.length; i++) {
        this.game.append('<span class="symbole">' + this.shuffle[i].hidden + ' ' + '<span class="index">'+i+'</span>'+'</span>');
    }
};

Game.prototype.update = function () {
var toto  = this;
    $('span.symbole').each(function () {
        if(!toto.shuffle[$(this).text().split(' ')[1]].finding) {
            $(this).html('❓' + ' ' + '<span class="index">'+$(this).text().split(' ')[1]+'</span>');
        }
    });
    this.limit = 0;
};

Game.prototype.timer = function () {
    var toto = this;
    this.chrono = setInterval(function () {
        if (toto.time >= 59) {
            toto.minute++;
            if (toto.minute <= 9) {
                $('.minute').text(0 + '' + toto.minute + ':');
            } else {
                $('.minute').text(toto.minute + ':');
            }
            toto.time = 0;
            $('.seconde').text(0 + '' + toto.time);
        } else {
            toto.time++;
            if (toto.time <= 9) {
                $('.seconde').text(0 + '' + toto.time);
            } else {
                $('.seconde').text(toto.time);
            }

        }

    }, 1000);
};

Game.prototype.saveData = function () {
    var data = JSON.stringify([this.minute, this.time]);
    window.localStorage.setItem('time', data);
};

Game.prototype.returnCard = function () {
    var toto = this;
    $('span.symbole').on('click', function () {
        if (toto.startChono === null) {
            toto.startChono = true;
            toto.timer();
        }

        var index = $(this).text().split(' ')[1];
        if (toto.shuffle[index] !== undefined && toto.limit < 2 ) {
            var show = toto.shuffle[index].symbol;
            $(this).html(show +' '+ '<span class="index">'+index+'</span>');
            toto.pair.push(show);
            toto.echec.push(index);
            toto.limit++;
            if (toto.limit === 2) {
                if (toto.echec[0] === toto.echec[1]) {
                    toto.pair = [];
                    toto.echec = [];
                    setTimeout(toto.update.bind(toto), 3000);
                    return;
                }
                if (toto.pair[0] === toto.pair[1]) {
                    toto.shuffle[toto.echec[0]].finding = true;
                    toto.shuffle[toto.echec[1]].finding = true;
                    toto.update();
                    toto.pair = [];
                    toto.echec = [];
                    toto.check++;
                    toto.win();
                } else {
                    setTimeout(toto.update.bind(toto), 2000);
                    toto.pair = [];
                    toto.echec = [];

                }

            }
        }
    });
};

Game.prototype.win = function () {
    if (this.check === 18) {
        clearInterval(this.chrono);
        alert('Bravo vous avez gagné !! votre temps: ' + this.minute +' minutes et ' + this.time + 'secondes');
        if (this.jsonData !== null) {
            var totalBefore = (this.jsonData[0] * 60) + this.jsonData[1];
            var totalNow = (this.minute * 60) + this.time;
            if (totalBefore > totalNow) {
                this.saveData();
                this.jsonData = JSON.parse(window.localStorage.getItem('time'));
                $('.score').text(this.jsonData[0] + ' minutes et ' + this.jsonData[1] + ' secondes');
            }
        } else {
            this.saveData();
            this.jsonData = JSON.parse(window.localStorage.getItem('time'));
            $('.score').text(this.jsonData[0] + ' minutes et ' + this.jsonData[1] + ' secondes');
        }

    }
};

Game.prototype.start = function () {
    this.initialize();
    this.toShuffle();
    this.returnCard();
};
