<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 29/01/2018
 * Time: 13:22
 */

class MessageController
{
    public function httpGetMethod(Http $http)
    {
        $title = 'message';
        $userSession = new UserSession();
        if(!$userSession->isAdmin())
        {
            $http->redirectTo('../');
        }

        $userModel = new UserModel();
        $numberOfMessages = $userModel->numberOfMessages();

        $totalMessages = $userModel->totalMessages();

        return [
            'numberOfMessages' => $numberOfMessages,
            'totalMessages'    => $totalMessages,
            'title'            => $title
        ];
    }

    public function httpPostMethod()
    {
        $userModel = new UserModel();
        if (isset($_GET)){
            if (isset($_GET['delete'])){
                $userModel->deleteMessage($_GET['delete']);
            } elseif (isset($_GET['notif'])) {
                $notif = '';
                $userModel->deleteNotification($notif, $_GET['notif']);
            }
        }
    }
}