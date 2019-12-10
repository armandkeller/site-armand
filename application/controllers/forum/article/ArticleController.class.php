<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 20/02/2018
 * Time: 12:22
 */

class articleController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        $title = 'article';
        $userSession = new UserSession();
        $commentModel = new CommentModel();
        $forumModel = new ForumModel();
        $comments = $commentModel->getComments($queryFields['id']);
        $article = $forumModel->getArticle($queryFields['id']);

        if (isset($queryFields['delete'])) {
            if($queryFields['user_id'] === $userSession->getUserId() || $userSession->isAdmin()) {
                $commentModel->delete($queryFields['id']);
                $http->redirectTo('/forum/article?id=' . $queryFields['idArticle']);
            }
        }

        if ($article) {
            return [
                'article'      => $article,
                'queryFields'  => $queryFields,
                'comments'     => $comments,
                'title'        => $title,
            ];
        } else {
            $http->redirectTo('/forum');
        }
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $commentModel = new CommentModel();
        $userSession = new UserSession();
        if (!empty($formFields['comment'])) {
            $commentModel->insert($GLOBALS['purifier']->purify($formFields['comment']), htmlspecialchars($_GET['id']), $userSession->getUserId());
            $http->redirectTo('/forum/article?id='.$_GET['id']);
        } else {
            $http->redirectTo('/forum/article?id='.$_GET['id'].'&state=false');
        }

    }
}