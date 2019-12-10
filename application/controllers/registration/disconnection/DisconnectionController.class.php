<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 25/01/2018
 * Time: 16:49
 */

class DisconnectionController
{
    public function httpGetMethod(Http $http)
    {
        $userSession = new UserSession();
        $userSession->destroy();

        $http->redirectTo('../');
    }
}