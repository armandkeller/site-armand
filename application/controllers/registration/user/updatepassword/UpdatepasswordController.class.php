<?php

class UpdatepasswordController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        return ['queryFields' => $queryFields];
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $userModel = new UserModel();

        if (isset($formFields['email'])) {
            if($userModel->existMail($formFields['email'])) {
                $newKeyUnique = uniqid('', true);
                $sujet = "Changer votre mot de passe" ;
                $entete = "From: changer-motdepasse@armand-dev.fr" ;
                $message = 'Bienvenue sur mon site armand-dev.fr,
                Pour changer votre mot de passe, veuillez cliquer sur le lien ci dessous
                ou copier/coller dans votre navigateur internet.
                https://armand-dev.fr/index.php/registration/user/updatepassword?changePasswordTo='.urlencode($formFields['email']).'&key='.urlencode($newKeyUnique).'
         
                ---------------
                Ceci est un mail automatique, Merci de ne pas y répondre.';

                $userModel->updateNewKeyUnique($newKeyUnique, $formFields['email']);
                mail($formFields['email'], $sujet, $message, $entete);
            } else {
                $http->redirectTo('/registration/user/updatepassword?state=noexist');
            }
        } else if (isset($formFields['password']) && isset($formFields['confirmPassword'])) {
            if (strlen($formFields['password']) >= 4) {
                if($formFields['password'] === $formFields['confirmPassword']) {
                    if ($userModel->verifKeyUser($formFields['changePasswordTo'], $formFields['key'])) {
                        $hash = password_hash($formFields['password'], PASSWORD_DEFAULT);
                        $newKeyUnique = uniqid('', true);
                        $userModel->updatePassword(htmlspecialchars($hash));
                        $userModel->updateNewKeyUnique($newKeyUnique, $formFields['changePasswordTo']);
                        $http->redirectTo('/registration/user?state=success');
                    } else {
                        $http->redirectTo('/registration/user/updatepassword?state=failed');
                    }
                } else {
                    $http->redirectTo('/registration/user/updatepassword?state=both&changePasswordTo='.$formFields['changePasswordTo'].'&key='.$formFields['key']);
                }
            } else {
                $http->redirectTo('/registration/user/updatepassword?state=length&changePasswordTo='.$formFields['changePasswordTo'].'&key='.$formFields['key']);
            }
        }
    }
}