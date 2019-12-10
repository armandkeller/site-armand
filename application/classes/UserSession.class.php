<?php


class UserSession
{
	public function __construct()
	{
		if(session_status() == PHP_SESSION_NONE)
		{
            // Démarrage du module PHP de gestion des sessions.
			session_start();
		}
	}

    public function create($id, $user, $email, $isAdmin)
    {
        // Construction de la session utilisateur.
        $_SESSION['user'] =
        [
            'id'    => $id,
            'user' => $user,
            'email'  => $email,
            'isAdmin'  => $isAdmin,
        ];
    }

    public function destroy()
    {
        // Destruction de l'ensemble de la session.
        $_SESSION = array();
        session_destroy();
    }

    public function getEmail()
    {
        if($this->isAuthenticated() == false)
        {
            return null;
        }

        return $_SESSION['user']['email'];
    }

    public function getFirstName()
    {
        if($this->isAuthenticated() == false)
        {
            return null;
        }

        return $_SESSION['user']['user'];
    }

    public function getUserId()
    {
        if($this->isAuthenticated() == false)
        {
            return null;
        }

        return $_SESSION['user']['id'];
    }

	public function isAuthenticated()
	{
		if(array_key_exists('user', $_SESSION))
		{
			if(!empty($_SESSION['user']))
			{
				return true;
			}
		}

		return false;
	}

    public function isAdmin()
    {
        if(!$this->isAuthenticated())
        {
            return false;
        }
        if ($_SESSION['user']['isAdmin'] === '1') {
            return $_SESSION['user']['isAdmin'];
        } else {
            return false;
        }
    }
}