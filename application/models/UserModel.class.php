<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 25/01/2018
 * Time: 09:28
 */

class UserModel
{
    private static $db;

    public function __construct()
    {
        self::$db = new Database();
    }

    public function existUser($name, $email)
    {
        $sql = ('SELECT `name`,`mail` FROM `user` WHERE `name`= ? OR `mail`= ?');

        return self::$db->queryOne($sql, [$name, $email]);
    }

    public function existMail($email)
    {
        $sql = ('SELECT `mail` FROM `user` WHERE `mail`= ?');

        return self::$db->queryOne($sql, [$email]);
    }

    public function updateNewKeyUnique($newKeyUnique, $email)
    {
        $sql = ('
            UPDATE
                `user`
            SET
                `keyUnique` = ?
            WHERE
                `mail` = ?
        ');
        self::$db->executeSql($sql, [$newKeyUnique, $email]);
    }

    public function updatePassword($newPassword)
    {
        $sql = ('
            UPDATE
                `user`
            SET
                `password` = ?
        ');
        self::$db->executeSql($sql, [$newPassword]);
    }

    public function newUser($name, $email, $password, $keyUnique, $active)
    {
        $sql = ('
            INSERT INTO
                `user` (
                `name`,
                `mail`,
                `password`,
                `keyUnique`,
                `active`,
                `createdAt`
                )
            VALUES 
                (?,?,?,?,?,NOW())
        ');
        return self::$db->executeSql($sql,[$name, $email, $password, $keyUnique, $active]);
    }

    public function verifKeyUser($mail, $keyUnique)
    {
        $sql = ('
            SELECT 
                `mail`, 
                `keyUnique` 
            FROM 
                `user` 
            WHERE 
                `mail` = ? AND `keyUnique` = ?
        ');
        return self::$db->queryOne($sql, [$mail, $keyUnique]);
    }

    public function active($active, $mail)
    {
        $sql = ('
            UPDATE
                `user`
            SET
                `active` = ?
            WHERE 
                `mail` = ?
        ');
        self::$db->executeSql($sql, [$active, $mail]);
    }

    public function connexion($email)
    {
        $sql= ('SELECT * FROM `user` WHERE `mail`= ?');
        return self::$db->queryOne($sql, [$email]);
    }

    public function messageMax($email)
    {
        $sql = ('SELECT mail, COUNT(*) FROM post WHERE mail = ? GROUP BY mail');
        return self::$db->queryOne($sql, [$email]);
    }

    public function addMessage($notif, $name, $email, $message)
    {
        $sql = ('

        INSERT INTO
            `post` (
                `notification`,
                `name`,
                `mail`,
                `message`,
                `createdAt`
            )
        VALUES
            (?,?,?,?,NOW())');
        self::$db->executeSql($sql,[$notif, $name, $email, $message]);
    }

    public function numberOfMessages()
    {
        $sql = ('SELECT COUNT(*) FROM `post`');
        return self::$db->queryOne($sql);
    }

    public function totalMessages()
    {
        $sql = ('SELECT
                    `id`,
                    `notification`,
                    `name`,
                    `mail`,
                    `message`,
                    DATE_FORMAT(`createdAt`, "%d/%m/%Y %Hh%i") AS `createdAt`
                FROM
                    `post`
                ORDER BY 
                    `createdAt`
                DESC 
                ');
        return self::$db->query($sql);
    }

    public function deleteMessage($id)
    {
        $sql = ('DELETE FROM `post` WHERE `post`.`id` = ?');
        self::$db->executeSql($sql, [$id]);
    }

    public function deleteNotification($notif, $id)
    {
        $sql = ('UPDATE  `post` SET `notification` = ? WHERE `id`= ?');
        self::$db->executeSql($sql, [$notif ,$id]);
    }

    public function notification($notif)
    {
        $sql =('SELECT COUNT(*) FROM `post` WHERE `notification` = ?');
        return self::$db->queryOne($sql, [$notif]);
    }
}