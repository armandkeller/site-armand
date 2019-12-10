'use strict';


$(function(){

    $('main article.acount form.creat').on('submit', function (event) {

        event.preventDefault();
        var regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
        var regexName = /^[a-zA-Z0-9_-]+$/;


        var name = $('#user').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();

        if (name.length <= 2) {
            $('.error').text('Erreur ! Le nom d\'utilisateur doit contenir minimum 3 caractères');
            return;
        }
        if (!regexName.test(name)) {
            $('.error').text('Erreur ! Le nom d\'utilisateur ne peut contenir des caractères ' +
                'spéciaux comme \'-_');
            return;
        }
        if (!regexEmail.test(email)) {
            $('.error').text('Erreur ! l\'adresse mail n\'est pas valide');
            return;
        }
        if (password.length <= 3) {
            $('.error').text('Erreur ! Le mot de passe doit contenir au minimum 4 caractères !');
            return;
        }

        $.post(
            getRequestUrl()+'/registration',
            {
                user: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            },
            function (data) {

                if ( data.substr(0, 7) === 'success'){
                    $('main article.acount form.creat').toggle('hidden');
                    $('.success').text('Votre compte à bien été créé ! Un mail a été envoyer à votre adresse pour l\'activation de votre compte. Pensez à vérifier dans les indésirables');
                }else if (data.substr(0, 13) === 'errorPassword') {
                    $('.errorPassword').text('Erreur ! Les mots de passes ne sont pas identiques');
                }else if (data.substr(0, 5) === 'exist'){
                    $('.exist').text('Erreur ! Le nom d\'utilisateur ou le mail est déjà pris');
                }else{
                    $('.error').text('Erreur un des champs n\'est pas remplit');
                }
            }
        );
    });

    $('main article.toConnect form.login').on('submit', function (event){
       event.preventDefault();

        var email = $('#mail').val();
        var password = $('#password').val();

        $.post(
            getRequestUrl()+'/registration/user',
            {
                email: email,
                password: password
            },
            function (data) {
                if (data.substr(0, 7) === 'success'){
                    window.location.href= getRequestUrl();
                } else if(data.substr(0, 8) === 'noactive') {
                    $('.error').text('Erreur ! Votre compte n\'est pas encore activé, cliquez sur le lien que vous avez reçu dans vos mails afin de l\'activer');
                }else{
                    $('.error').text('Erreur ! Identifiants incorrectes !');
                }
            }
        )
    });

    $('main article.message form.contact').on('submit', function (event) {

        event.preventDefault();

        var notification = 'new';
        var message = content.getData(); /* variable 'content' de ckeditor sur contactView.phtml */

        $.post(
            getRequestUrl()+'/registration/contact',
            {
                notification: notification,
                message: message
            },
            function (data) {
                if (data.substr(0, 7) === 'success') {
                    $('main article.message form.contact').toggle('hidden');
                    $('.success').text('Votre message à bien été posté !');
                }else if (data.substr(0, 10) === 'errorlimit') {
                    $('.error').text('Erreur ! Vous avez envoyer trop de message !');
                }else{
                    $('.error').text('Erreur ! le message est vide !');
                }
            }
        )
    });

    $('main article.crud a.trash').on('click', function (event) {

        event.preventDefault();
        var id = $(this).attr('href');
        $.post(id, function () {
            window.location.reload();
        });

    });

    $('main article.crud a.notif').on('click', function (event) {

        event.preventDefault();
        var notif = $(this).attr('href');
        $.post(notif, function () {
            window.location.reload();
        });

    });
});



