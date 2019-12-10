<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 24/01/2018
 * Time: 16:17
 */

class ActivationController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        $title = 'activation';
        $userModel = new UserModel();
        $active = true;

        if ($userModel->verifKeyUser($queryFields['log'], $queryFields['key'])){
            $userModel->active($active, $queryFields['log']);
            $state = 'Votre compte à bien été activé !';
        } else {
            $state = 'Erreur le compte n\'a pas été créé ! <br>Les identifiants ne sont pas bon !';
        }
        return [
            'title' => $title,
            'state' => $state
        ];
    }

    public function httpPostMethod()
    {

    }
}