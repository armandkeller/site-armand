<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 24/01/2018
 * Time: 16:17
 */

class RegistrationController
{
    public function httpGetMethod()
    {
        $title = 'inscription';
        return ['title' => $title];
    }

    public function httpPostMethod(Http $http, array $formFields)
    {


        $user = new UserModel();
        $userExist = $user->existUser($formFields['user'], $formFields['email']);
        $hashPassword = password_hash($formFields['password'], PASSWORD_DEFAULT);
        $keyUnique = uniqid('', true);
        $sujet = "Activer votre compte" ;
        $entete = "From: inscription@armand-dev.fr" ;
        $message = 'Bienvenue sur mon site armand-dev.fr,
        Pour activer votre compte, veuillez cliquer sur le lien ci dessous
        ou copier/coller dans votre navigateur internet.
        https://armand-dev.fr/index.php/registration/activation?log='.urlencode($formFields['email']).'&key='.urlencode($keyUnique).'
 
 
        ---------------
        Ceci est un mail automatique, Merci de ne pas y répondre.';
        $active = 0;

            if (!empty($formFields['user']) &&
                !empty($formFields['email']) &&
                !empty($formFields['password']) &&
                !empty($formFields['confirmPassword'])) {

                if (!$userExist){
                    if ($formFields['password'] === $formFields['confirmPassword']){
                        $user->newUser(htmlspecialchars($formFields['user']), htmlspecialchars($formFields['email']), htmlspecialchars($hashPassword), $keyUnique, $active);
                        mail($formFields['email'], $sujet, $message, $entete) ;
                        echo 'success';
                    } else {
                        echo 'errorPassword';
                    }
                } else {
                    echo 'exist';
                }
            } else {
                echo 'failed';
            }
    }
}