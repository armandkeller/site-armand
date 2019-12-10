<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 25/01/2018
 * Time: 12:25
 */

class UserController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        $title = 'connexion';
        return [
            'title'       => $title,
            'queryFields' => $queryFields
        ];
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $user = new UserModel();
        $idOfConnexion = $user->connexion($formFields['email']);
        $verifPassword = password_verify($formFields['password'], $idOfConnexion['password']);

        if ($verifPassword) {
            $userSession = new UserSession();
            if ($idOfConnexion['active']) {
                $userSession->create
                (
                    htmlspecialchars($idOfConnexion['id']),
                    htmlspecialchars($idOfConnexion['name']),
                    htmlspecialchars($idOfConnexion['mail']),
                    htmlspecialchars($idOfConnexion['isAdmin'])
                );
                echo 'success';
            } else {
                echo 'noactive';
            }
        } else {
            echo 'failed';
        }
    }
}