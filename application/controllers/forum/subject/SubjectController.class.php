<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 19/02/2018
 * Time: 15:15
 */

class SubjectController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        $title = 'thème';
        $forumModel = new ForumModel();
        $commentModel = new CommentModel();
        switch ($queryFields['language']) {
            case 'html':
                $posts = $forumModel->getContent(1);
                break;

            case 'css':
                $posts = $forumModel->getContent(2);
                break;

            case 'javascript':
                $posts = $forumModel->getContent(3);
                break;

            case 'php':
                $posts = $forumModel->getContent(4);
                break;

            case 'mysql':
                $posts = $forumModel->getContent(5);
                break;

            case 'other':
                $posts = $forumModel->getContent(6);
                break;

            default:
                $http->redirectTo('/forum');
        }

        return [
            'posts'         => $posts,
            'queryFields'   => $queryFields,
            'commentModel'  => $commentModel,
            'title'         => $title,
        ];
    }
}