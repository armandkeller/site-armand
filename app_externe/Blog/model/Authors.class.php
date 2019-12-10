<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 06/02/2018
 * Time: 17:32
 */
require_once 'Database.class.php';

class Author extends Database
{
    public function __construct()
    {
        parent::__construct('armanddeiu38000');
    }

    public function listAuthors()
    {
        $authors = $this->query('
            SELECT
                *
            FROM
                `author`
        ');
        return $authors;
    }

    public function oneAuthor($id)
    {
        $author = $this->queryOne('
            SELECT
                *
            FROM
                `author`
            WHERE
                `id` = ?
        ', [$id]);
        return $author;
    }

    public function insert($firstName, $lastName)
    {
        $this->sql('
            INSERT INTO
                `author` (
                    `firstName`,
                    `lastName`
                )
            VALUES
                (?,?)               
        ', [$firstName, $lastName]);
    }

    public function deleteAuthor($id)
    {
        $this->sql('
            DELETE
            FROM
                `author`
            WHERE
                `id` = ?
        ', [$id]);
    }
}