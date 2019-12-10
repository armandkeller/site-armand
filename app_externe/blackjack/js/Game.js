'use strict';

var Game = function () {

    this.cardGame = [
        {name: 'as_de_pique', value: 11, url: 'img/asdepique.png'},
        {name: 'as_de_coeur', value: 11, url: 'img/asdecoeur.png'},
        {name: 'as_de_trefle', value: 11, url: 'img/asdetrefle.png'},
        {name: 'as_de_carreau', value: 11, url: 'img/asdecarreau.png'},

        {name: 'roi_de_pique', value: 10, url: 'img/roidepique.png'},
        {name: 'roi_de_coeur', value: 10, url: 'img/roidecoeur.png'},
        {name: 'roi_de_trefle', value: 10, url: 'img/roidetrefle.png'},
        {name: 'roi_de_carreau', value: 10, url: 'img/roidecarreau.png'},

        {name: 'dame_de_pique', value: 10, url: 'img/damedepique.png'},
        {name: 'dame_de_coeur', value: 10, url: 'img/damedecoeur.png'},
        {name: 'dame_de_trefle', value: 10, url: 'img/damedetrefle.png'},
        {name: 'dame_de_carreau', value: 10, url: 'img/damedecarreau.png'},

        {name: 'valet_de_pique', value: 10, url: 'img/valetdepique.png'},
        {name: 'valet_de_coeur', value: 10, url: 'img/valetdecoeur.png'},
        {name: 'valet_de_trefle', value: 10, url: 'img/valetdetrefle.png'},
        {name: 'valet_de_carreau', value: 10, url: 'img/valetdecarreau.png'},

        {name: '10_de_pique', value: 10, url: 'img/10depique.png'},
        {name: '10_de_coeur', value: 10, url: 'img/10decoeur.png'},
        {name: '10_de_trefle', value: 10, url: 'img/10detrefle.png'},
        {name: '10_de_carreau', value: 10, url: 'img/10decarreau.png'},

        {name: '9_de_pique', value: 9, url: 'img/9depique.png'},
        {name: '9_de_coeur', value: 9, url: 'img/9decoeur.png'},
        {name: '9_de_trefle', value: 9, url: 'img/9detrefle.png'},
        {name: '9_de_carreau', value: 9, url: 'img/9decarreau.png'},

        {name: '8_de_pique', value: 8, url: 'img/8depique.png'},
        {name: '8_de_coeur', value: 8, url: 'img/8decoeur.png'},
        {name: '8_de_trefle', value: 8, url: 'img/8detrefle.png'},
        {name: '8_de_carreau', value: 8, url: 'img/8decarreau.png'},

        {name: '7_de_pique', value: 7, url: 'img/7depique.png'},
        {name: '7_de_coeur', value: 7, url: 'img/7decoeur.png'},
        {name: '7_de_trefle', value: 7, url: 'img/7detrefle.png'},
        {name: '7_de_carreau', value: 7, url: 'img/7decarreau.png'},

        {name: '6_de_pique', value: 6, url: 'img/6depique.png'},
        {name: '6_de_coeur', value: 6, url: 'img/6decoeur.png'},
        {name: '6_de_trefle', value: 6, url: 'img/6detrefle.png'},
        {name: '6_de_carreau', value: 6, url: 'img/6decarreau.png'},

        {name: '5_de_pique', value: 5, url: 'img/5depique.png'},
        {name: '5_de_coeur', value: 5, url: 'img/5decoeur.png'},
        {name: '5_de_trefle', value: 5, url: 'img/5detrefle.png'},
        {name: '5_de_carreau', value: 5, url: 'img/5decarreau.png'},

        {name: '4_de_pique', value: 4, url: 'img/4depique.png'},
        {name: '4_de_coeur', value: 4, url: 'img/4decoeur.png'},
        {name: '4_de_trefle', value: 4, url: 'img/4detrefle.png'},
        {name: '4_de_carreau', value: 4, url: 'img/4decarreau.png'},

        {name: '3_de_pique', value: 3, url: 'img/3depique.png'},
        {name: '3_de_coeur', value: 3, url: 'img/3decoeur.png'},
        {name: '3_de_trefle', value: 3, url: 'img/3detrefle.png'},
        {name: '3_de_carreau', value: 3, url: 'img/3decarreau.png'},

        {name: '2_de_pique', value: 2, url: 'img/2depique.png'},
        {name: '2_de_coeur', value: 2, url: 'img/2decoeur.png'},
        {name: '2_de_trefle', value: 2, url: 'img/2detrefle.png'},
        {name: '2_de_carreau', value: 2, url: 'img/2decarreau.png'}
    ];

    this.player = new Player();
    this.croupier = new Croupier();
    this.indexToCard = 0;
    this.width = 120;
    this.height = 200;
    this.memory = '';

    $('p.gain span').text(this.player.money);
    $('p.gainC span').text(this.croupier.money);
    $('.start .start').on('click', this.start.bind(this));
    $(document).on('click', '.button .draw', this.drawACard.bind(this));
    $(document).on('click', '.button .stop', this.croupierDrawCards.bind(this));
};

Game.prototype.rand = function (min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Game.prototype.toAvare = function () {
    this.player.setting = window.prompt('vous disposez de ' + this.player.money + ' combien voulez-vous miser ? (minimum: 10)');
    if (this.player.setting > this.player.money) {
        this.player.setting = this.player.money
    } else if (this.player.setting < 10) {
        this.player.setting = 10;
    } else if (isNaN(this.player.setting)) {
        this.player.setting = 10;
    }
    return this.player.setting;
};

Game.prototype.blackjack21 = function (who) {
    var card1 = who.card[0]['name'].substr(0, 2);
    var card2 = who.card[1]['name'].substr(0, 2);
    if ((card1 === 'as') && (card2 === 'ro' || card2 === 'da' || card2 === 'va')) {
        return true;
    } else if ((card2 === 'as') && (card1 === 'ro' || card1 === 'da' || card1 === 'va')) {
        return true;
    } else {
        return false;
    }
};

Game.prototype.mixe = function () {

    var index = [];
    var cardMixed = [];

    while (this.cardGame.length !== index.length) {
        var r = this.rand(0, this.cardGame.length - 1);
        if (index.indexOf(r) === -1) {
            index.push(r);
        }
    }
    for (var i = 0; i < index.length; i++) {
        cardMixed.push(this.cardGame[index[i]]);
    }
    return this.cardGame = cardMixed;

};

Game.prototype.initialize = function () {

    this.player.card.push(this.cardGame[this.indexToCard]);
    this.indexToCard++;
    this.croupier.card.push(this.cardGame[this.indexToCard]);
    this.indexToCard++;
    this.player.card.push(this.cardGame[this.indexToCard]);
    this.indexToCard++;
    this.croupier.card.push(this.cardGame[this.indexToCard]);
    this.indexToCard++;
    for (var i = 0; i < this.croupier.card.length; i++) {
        if (i === 1) {
            this.memory = this.croupier.card[i].url;
            $('.game .cardCroupier').append('<img src=' + 'img/cache.jpg' + ' width=' + this.width + ' height=' + this.height + ' alt='+'carte_face_caché'+' title='+'carte_face_caché'+'>');
        } else {
            $('.game .cardCroupier').append('<img src=' + this.croupier.card[i].url + ' width=' + this.width + ' height=' + this.height + ' alt='+this.croupier.card[i].name+' title='+this.croupier.card[i].name+'>');
        }
    }
    for (i = 0; i < this.player.card.length; i++) {
        $('.game .cardPlayer').append('<img src=' + this.player.card[i].url + ' width=' + this.width + ' height=' + this.height + ' alt='+this.player.card[i].name+' title='+this.player.card[i].name+'>');
    }
    $('.game .titleCardCroupier').text('Jeu du croupier');
    $('.game .titleCardPlayer').text('Jeu du joueur');
    $('.button').append('<p class="draw btn btn-primary">Tirez une carte</p>');
    $('.button').append('<p class="stop btn btn-danger">Stop</p>');
    this.player.totalValue();
    this.croupier.totalValue();
};

Game.prototype.loser = function (who) {
    return who.totalValueCard > 21;
};

Game.prototype.drawACard = function () {
    this.player.card.push(this.cardGame[this.indexToCard]);
    this.indexToCard++;
    $('.game .cardPlayer').append('<img src=' + this.player.card[this.player.card.length - 1].url + ' width=' + this.width + ' height=' + this.height +  'alt='+this.player.card[this.player.card.length - 1].name+' title='+this.player.card[this.player.card.length - 1].name+'>');

    this.player.totalValue();
    if (this.player.totalValueCard > 21) {
        this.haveAAs(this.player);
    }
    this.player.totalValue();
    if (this.player.totalValueCard > 21) {
        $('#message').addClass('alert alert-danger').append(
            '<p>Perdu ! le croupier à remporter cette manche</p>',
            '<p>Vous avez un total de ' + this.player.totalValueCard +'</p>'
        );
        $('.button').empty();
        $('.start .start').addClass('btn btn-primary').text('Lancer la partie');
        this.playerLoserGain();
        return;
    }

};
Game.prototype.croupierDrawCards = function () {
    this.player.totalValue();
    this.croupier.totalValue();
    if($('.cardCroupier img:nth-of-type(2)').attr('src') === 'img/cache.jpg') {
        $('.cardCroupier img:nth-of-type(2)').attr({
            src: this.memory,
            title: this.croupier.card[1].name,
            alt: this.croupier.card[1].name
        });
    }
    if (!this.blackjack21(this.croupier)) {
        if (this.croupier.totalValueCard > 21) {
            this.croupier.card[0]['value'] = 1;
            this.croupier.totalValue();
        }
        while (this.croupier.totalValueCard < 17) {

            this.croupier.card.push(this.cardGame[this.indexToCard]);
            this.indexToCard++;
            $('.game .cardCroupier').append('<img src=' + this.croupier.card[this.croupier.card.length - 1].url + ' width=' + this.width + ' height=' + this.height + 'alt='+this.croupier.card[this.croupier.card.length - 1].name+' title='+this.croupier.card[this.croupier.card.length - 1].name+'>');
            this.croupier.totalValue();

            if (this.croupier.totalValueCard > 21) {
                this.haveAAs(this.croupier);
                this.croupier.totalValue();
            }
        }
        if (this.loser(this.croupier)) {
            $('#message').addClass('alert alert-success').append(
                '<p>Gagné ! Vous remportez cette manche</p>',
                '<p>Vous avez un total de ' + this.player.totalValueCard +'</p>',
                '<p>Le croupier à un total de ' + this.croupier.totalValueCard + '</p>'
            );
            $('.button').empty();
            $('.start .start').addClass('btn btn-primary').text('Lancer la partie');
            this.playerWinnerGain();
            return;
        } else {
            this.endOfgame();
        }
    } else {
        this.croupierWinWithBlackjack();
        return;
    }
};
Game.prototype.endOfgame = function () {
    if (this.player.totalValueCard > this.croupier.totalValueCard) {
        $('#message').addClass('alert alert-success').append(
            '<p>Gagné ! Vous remportez cette manche</p>',
            '<p>Vous avez un total de ' + this.player.totalValueCard +'</p>',
            '<p>Le croupier à un total de ' + this.croupier.totalValueCard + '</p>'
        );
        $('.button').empty();
        $('.start .start').addClass('btn btn-primary').text('Lancer la partie');
        this.playerWinnerGain();

    } else if (this.player.totalValueCard === this.croupier.totalValueCard) {
        $('#message').addClass('alert alert-warning').append(
            '<p>&Eacute;galité !</p>',
            '<p>Vous avez un total de ' + this.player.totalValueCard +'</p>',
            '<p>Le croupier à un total de ' + this.croupier.totalValueCard + '</p>'
        );
        $('.button').empty();
        $('.start .start').addClass('btn btn-primary').text('Lancer la partie');

        this.showNewGain();

    } else {
        $('#message').addClass('alert alert-danger').append(
            '<p>Perdu ! le croupier à remporter cette manche</p>',
            '<p>Vous avez un total de ' + this.player.totalValueCard +'</p>',
            '<p>Le croupier à un total de ' + this.croupier.totalValueCard + '</p>'
        );
        $('.button').empty();
        $('.start .start').addClass('btn btn-primary').text('Lancer la partie');

        this.playerLoserGain();
    }
};
Game.prototype.haveAAs = function (who) {
    for (var i = 0; i < who.card.length; i++) {
        if (who.card[i]['name'].substr(0, 2) === 'as') {
            if (who.card[i].value === 11) {
                who.card[i]['value'] = 1;
                break;
            }
        }
    }
};
Game.prototype.winWithBlackjack = function () {
    $('#message').addClass('alert alert-success').append('<p>Vous avez gagné avec un blackjack</p>');
    $('.button').empty();
    $('.start .start').addClass('btn btn-primary').text('Lancer la partie');
    this.player.money += (this.player.setting * 3);
    this.croupier.money -= (this.player.setting * 3);
};
Game.prototype.croupierWinWithBlackjack = function () {
    $('#message').addClass('alert alert-danger').append('<p>Perdu ! le croupier à remporter cette manche avec un blackjack</p>');
    $('.button').empty();
    $('.start .start').addClass('btn btn-primary').text('Lancer la partie');
    this.playerLoserGain();
};

Game.prototype.reinitializeAs = function () {
    for (var i = 0; i < this.cardGame.length; i++) {
        if (this.cardGame[i]['name'].substr(0, 2) === 'as') {
            this.cardGame[i]['value'] = 11;
        }
    }
};

Game.prototype.playerWinnerGain = function () {
    this.player.money += Number(this.player.setting);
    this.croupier.money -= Number(this.player.setting);
    this.showNewGain();
};
Game.prototype.playerLoserGain = function () {
    this.player.money -= Number(this.player.setting);
    this.croupier.money += Number(this.player.setting);
    this.showNewGain();
};
Game.prototype.showNewGain = function () {
    $('p.gain span').text(this.player.money);
    $('p.gainC span').text(this.croupier.money);
};

Game.prototype.start = function () {
    $('.game .cardCroupier, .game .cardPlayer, .game h3, #message, .button').empty();
    $('#message').removeClass();
    $('.start .start').removeClass('btn btn-primary').empty();
    this.memory = '';
    this.indexToCard = 0;
    this.player.setting = 0;
    this.croupier.card = [];
    this.player.card = [];
    this.reinitializeAs();
    if (this.player.money <= 0) {
        alert('vous êtes ruiné');
        return;
    } else if (this.croupier.money <= 0) {
        alert('le croupier est ruiné');
        return;
    }
    this.mixe();
    this.toAvare();
    this.initialize();
    if (!this.blackjack21(this.player)) {
        if (this.player.totalValueCard > 21) {
            this.player.card[0]['value'] = 1;
            this.player.totalValue();
        }
    } else {
        this.winWithBlackjack();
        this.showNewGain();
    }
};