<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 10/01/2018
 * Time: 19:29
 */
require_once 'Database.class.php';


class Comments extends Database
{

    public function __construct()
    {
        parent::__construct('armanddeiu38000');
    }

    public function selectAllComments($id)
    {
        $comments = $this->query('

        SELECT
            `id`,
            `nickName`,
            `content`,
             DATE_FORMAT(`createdAt`, "%d/%m/%Y %Hh%i") AS `createdAt`
        FROM
            `comment_blog`
        WHERE 
            `post_id`= ?
        ORDER BY 
            `createdAt`
        DESC    
        
        ', [$id]);

        return $comments;
    }

    public function addComment($nickName, $content, $post_id)
    {
        $addComment = $this->sql('
        
            INSERT INTO
                `comment_blog` (
                    `nickName`,
                    `content`,
                    `createdAt`,
                    `post_id`
                )
            VALUES 
                (?,?,NOW(),?)
        ',[$nickName, $content, $post_id]);
        return $addComment;
    }

    public function deleteComment($id)
    {
       $this->sql('
            DELETE
            FROM
                `comment_blog`
            WHERE
                `id` = ?
       ', [$id]);
   }
}