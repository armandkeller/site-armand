<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 16/02/2018
 * Time: 17:02
 */

class ForumModel
{
    private static $db;

    public function __construct()
    {
        self::$db = new Database();
    }

    public function insertNewSubject($subject, $content, $user_id, $language_id)
    {
        $sql = ('
        INSERT INTO 
            `forum`(
                `subject`,
                `content`, 
                `createdAt`, 
                `user_id`,
                `language_id`
                )
        VALUES 
            (?,?,NOW(),?,?)
        ');
        self::$db->executeSql($sql, [$subject, $content, $user_id, $language_id]);
    }

    public function lastIdOfArticle()
    {
        $sql = ('SELECT MAX(`id`)AS `lastId` FROM `forum`');
        return self::$db->queryOne($sql);
    }

    public function getAllSubjects()
    {
        $sql = ('
            SELECT 
                `name`,
                `subject`, 
                `content` 
            FROM 
                `forum` 
            INNER JOIN 
                `user` on `user_id` = `user`.`id`
        ');
        return self::$db->query($sql);
    }

    public function getAllLanguage()
    {
        $sql = ('SELECT * FROM `language`');
        return self::$db->query($sql);
    }

    public function getNumberOfPostFromLanguage($language_id)
    {
        $sql = ('SELECT COUNT(*) AS `nbr` FROM `forum` WHERE `language_id` = ?');
        return self::$db->queryOne($sql, [$language_id]);
    }

    public function getContent($language_id)
    {
        $sql = ('
            SELECT
                `forum`.`id`, 
                `subject`, 
                `content`, 
                `user`.`name`,
                DATE_FORMAT(`forum`.`createdAt`, "%d/%m/%Y %Hh%i") AS `createdAt`
            FROM 
                `forum` 
            INNER JOIN 
                `user` on `user_id` = `user`.`id` 
            WHERE 
                `language_id` = ?
            ORDER BY
                `createdAt` 
            DESC 
        ');
        return self::$db->query($sql, [$language_id]);
    }

    public function getArticle($id)
    {
        $sql = ('
            SELECT
                `forum`.`id`,
                `language`.`id` AS `idLanguage`,
                `subject`,
                `content`,
                `language`.`name` AS `languageChecked`,
                `user`.`name`,
                DATE_FORMAT(`forum`.`createdAt`, "%d/%m/%Y %Hh%i") AS `createdAt`,
                `user_id`
            FROM
                `forum`
            INNER JOIN 
                `user` ON `user_id` = `user`.`id`
            INNER JOIN 
                `language` ON `language_id` = `language`.`id`
            WHERE
                `forum`.`id` = ?
        ');
        return self::$db->queryOne($sql, [$id]);
    }

    public function update($language, $subject, $content, $id)
    {
        $sql = ('
            UPDATE 
                `forum`
            SET
                `language_id` = ?,
                `subject` = ?,
                `content` = ?,
                `createdAt` = NOW()
            WHERE
                `id` = ?
        ');
        self::$db->executeSql($sql, [$language, $subject, $content, $id]);
    }

    public function delete($id)
    {
        $sql = ('
            DELETE
            FROM
                `forum`
            WHERE `id` = ?
        ');
        self::$db->executeSql($sql, [$id]);
    }
}