<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 16/02/2018
 * Time: 16:38
 */

class NewSubjectController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        $userSession = new UserSession();
        $forumModel = new ForumModel();
        $languages = $forumModel->getAllLanguage();

        if (isset($queryFields['delete'])) {
            $article = $forumModel->getArticle($queryFields['id']);
            if ($userSession->getUserId() === $article['user_id'] || $userSession->isAdmin()) {
                $forumModel->delete($queryFields['id']);
                $http->redirectTo('/forum');
            } else {
                $http->redirectTo('/forum');
            }
        } else if (isset($queryFields['id'])) {
            $article = $forumModel->getArticle($queryFields['id']);
            return [
                'languages' => $languages,
                'article'   => $article,
                'queryFields' => $queryFields
            ];
        } else {
            return [
                'languages' => $languages,
                'queryFields' => $queryFields
            ];
        }
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $userSession = new UserSession();
        $forumModel = new ForumModel();


        if (!isset($_GET['id'])) {
            if (!empty($formFields['subject']) && !empty($formFields['content']) && !empty($formFields['this'])) {
                $forumModel->insertNewSubject(
                    htmlspecialchars($formFields['subject']),
                    $GLOBALS['purifier']->purify($formFields['content']),
                    htmlspecialchars($userSession->getUserId()),
                    htmlspecialchars($formFields['this'])
                );
                $lastId = $forumModel->lastIdOfArticle();
                $http->redirectTo('/forum/article?id='.$lastId['lastId']);

            } else {
                $http->redirectTo('/forum/newSubject?state=false');
            }
        } else if (isset($_GET['id'])) {
            $article = $forumModel->getArticle($_GET['id']);
            if ($userSession->getUserId() === $article['user_id'] ) {
                if (!empty($formFields['subject']) && !empty($formFields['content']) && !empty($formFields['this'])) {
                    $forumModel->update(htmlspecialchars($formFields['this']), htmlspecialchars($formFields['subject']), $GLOBALS['purifier']->purify($formFields['content']), $_GET['id']);
                    $http->redirectTo('/forum/article?id='.$_GET['id']);
                } else {
                    $http->redirectTo('/forum/newSubject?update&id=' . $_GET['id'] . '&state=false');
                }
            }
        }
        $http->redirectTo('/forum');
    }
}