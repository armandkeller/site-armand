<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 25/01/2018
 * Time: 17:06
 */

class ContactController
{
    public function httpGetMethod()
    {
        $title = 'contact';
        return ['title' => $title];
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $userSession = new UserSession();
        $userModel = new UserModel();

        $messages = $userModel->messageMax($userSession->getEmail());

        if ($messages['COUNT(*)'] <= 4) {
            if (!empty($formFields['message'])) {
                $userModel->addMessage(
                    htmlspecialchars($formFields['notification']),
                    $userSession->getFirstName(),
                    $userSession->getEmail(),
                    $GLOBALS['purifier']->purify($formFields['message'])
                    );
                echo 'success';
            } else {
                echo 'error';
            }
        } else {
            echo 'errorlimit';
        }
    }
}