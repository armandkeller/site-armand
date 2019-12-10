<?php

class IpModel
{
    private static $db;

    public function __construct()
    {
        self::$db = new Database();
    }

    public function isNewIp($address)
    {
        $sql = ('
            SELECT
                `address`,
                `visit`,
                `createdAt`
            FROM
                `ip`
            WHERE
                `address` = ?
        ');
        return self::$db->queryOne($sql, [$address]);
    }

    public function insertIp($address, $visit)
    {
        $sql = ('
            INSERT INTO
                `ip` (
                    `address`,
                    `visit`,
                    `createdAt`
                )
                VALUES (?,?,NOW())
        ');
        self::$db->executeSql($sql, [$address, $visit]);
    }

    public function incrementNumberOfVisit($visit, $address)
    {
        $sql = ('
            UPDATE 
                `ip`
            SET
                `visit` = `visit` + ?,
                `createdAt` = NOW()
            WHERE
                `address` = ?
        ');
        self::$db->executeSql($sql, [$visit, $address]);
    }

    public function itsMe($address, $itsMe)
    {
        $sql = ('
            SELECT
                `address`,
                `its_me`
            FROM
                `ip`
            WHERE
                `address` = ? AND `its_me` = ?
        ');
        return self::$db->queryOne($sql, [$address, $itsMe]);
    }

    public function totalVisit(){
        $sql = ('
            SELECT 
                SUM(`visit`) AS `totalVisit`
            FROM 
                `ip`
            WHERE 
                `its_me` <> 1
        ');
        return self::$db->queryOne($sql);
    }
}