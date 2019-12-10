<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 22/02/2018
 * Time: 14:11
 */

class CommentModel
{
    private static $db;

    public function __construct()
    {
        self::$db = new Database();
    }

    public function insert($content, $forum_id, $user_id)
    {
        $sql = ('
            INSERT INTO
                `comment` (
                    `content`,
                    `createdAt`,
                    `forum_id`,
                    `user_id`
                )
            VALUES 
                (?,NOW(),?,?)
        ');
        self::$db->executeSql($sql, [$content, $forum_id, $user_id]);
    }

    public function getComments($forum_id)
    {
        $sql = ('
            SELECT
                `comment`.`id`, 
                `comment`.`content`, 
                `user`.`name`, 
                DATE_FORMAT(`comment`.`createdAt`, "%d/%m/%Y %Hh%i") AS `createdAt`, 
                `comment`.`user_id`
            FROM 
                `comment`
            INNER JOIN 
                `user`ON `user_id` = `user`.`id`
            WHERE 
                `forum_id` = ?
        ');
        return self::$db->query($sql, [$forum_id]);
    }
    public function getCountComment($forum_id)
    {
        $sql = ('
            SELECT
                COUNT(*)
            FROM
                `comment`
            WHERE
                `forum_id` = ?
        ');
        return self::$db->queryOne($sql, [$forum_id]);
    }
    public function delete($id)
    {
        $sql = ('
            DELETE
            FROM
                `comment`
            WHERE 
                `id` = ?    
        ');
        self::$db->executeSql($sql, [$id]);
    }
}