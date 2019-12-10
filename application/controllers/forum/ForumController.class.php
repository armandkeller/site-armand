<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 16/02/2018
 * Time: 15:33
 */

class ForumController
{
    public function httpGetMethod()
    {
        $title = 'forum';
        $forumModel = new ForumModel();
        $subjects = $forumModel->getAllSubjects();
        $countHtml = $forumModel->getNumberOfPostFromLanguage(1);
        $countCss = $forumModel->getNumberOfPostFromLanguage(2);
        $countJavascript = $forumModel->getNumberOfPostFromLanguage(3);
        $countPhp = $forumModel->getNumberOfPostFromLanguage(4);
        $countMysql = $forumModel->getNumberOfPostFromLanguage(5);
        $countOther = $forumModel->getNumberOfPostFromLanguage(6);

        return [
            'subjects'        => $subjects,
            'countHtml'       => $countHtml,
            'countCss'        => $countCss,
            'countJavascript' => $countJavascript,
            'countPhp'        => $countPhp,
            'countMysql'      => $countMysql,
            'countOther'      => $countOther,
            'title'           => $title,
        ];
    }
}