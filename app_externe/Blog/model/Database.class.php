<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 07/01/2018
 * Time: 18:28
 */

class Database
{
    private static $db = null;


    public function __construct($db_name, $db_mysql='armanddeiu38000.mysql.db', $db_user='armanddeiu38000', $db_password = 'Adke2018')
    {
        try {
            if (is_null(self::$db)) {
                self::$db = new PDO('mysql:host=' . $db_mysql . ';dbname=' . $db_name . ';charset=utf8',
                    $db_user,
                    $db_password,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                    ]);
                self::$db->exec('SET NAMES UTF8');
            }
        } catch (\PDOException $e) {
            echo 'Un problème est survenu :' . $e->getMessage();
        }

    }

    public function queryOne($requete, $param = [])
    {
        $query = self::$db->prepare($requete);
        $query->execute($param);
        return $query->fetch();
    }

    public function query($requete, $param = [])
    {
        $query = self::$db->prepare($requete);
        $query->execute($param);
        return $query->fetchAll();
    }

    public function sql($requete, $value = [])
    {
        $query = self::$db->prepare($requete);
        return $query->execute($value);
    }
}