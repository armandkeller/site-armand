<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 10/01/2018
 * Time: 19:29
 */
require_once 'Database.class.php';

class Posts extends Database
{
    public function __construct()
    {
        parent::__construct('armanddeiu38000');
    }

    public function selectAllPosts()
    {

        $posts = $this->query('
            SELECT 
                `article`.`id`,
                `title`,
                `content`,
                `firstName`,
                `lastName`,
                DATE_FORMAT(`createdAt`, "%d/%m/%Y %Hh%i") AS `createdAt`,
                `author_id` 
            FROM 
                `article` 
            INNER JOIN 
                author on author_id = author.id 
            ORDER BY 
                `createdAt`
            DESC 
            ');
        return $posts;
    }

    public function selectOnePost($id)
    {
        try {
            $post = $this->queryOne('

            SELECT
                `article`.`id`,
                `title`,
                `content`,
                `createdAt`,
                `firstName`,
                `lastName`,
                 DATE_FORMAT(`createdAt`, "%d/%m/%Y à %Hh%i") AS `createdAt`
            FROM
                `article`
            INNER JOIN
                author on author_id = author.id
            WHERE 
                `article`.`id` = ?         
            ', [$id]);

            return $post;
        } catch (Exception $e) {
            echo 'Erreur:'. $e->getMessage();
        }
    }

    public function deletePost($id)
    {
        $post = $this->sql('DELETE FROM `post` WHERE `id` = ?', [$id]);
        return $post;
    }

    public function insertPost($title, $content, $author_id)
    {
        $this->sql('
            INSERT INTO
                `article` (
                    `title`,
                    `content`,
                    `createdAt`,
                    `author_id`
                )
            VALUES 
                (?,?,NOW(),?)
            ', [$title, $content, $author_id]);
    }

    public function updatePost($title, $content, $author_id, $id)
    {
        $this->sql('
            UPDATE
                `article`
            SET
                `title` = ?,
                `content` = ?,
                `author_id` = ?,
                `createdAt` = NOW()
            WHERE 
                `id` = ?
        ', [$title, $content, $author_id, $id]);
    }
}