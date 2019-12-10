<?php

class Ip
{
    private $ip;
    private $ipModel;

    public function __construct()
    {
        $this->ipModel = new UserModel();
    }

    public function get_ip()
    {
        if (isset ($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $this->ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (isset ($_SERVER['HTTP_CLIENT_IP'])) {
            $this->ip = $_SERVER['HTTP_CLIENT_IP'];
        } else {
            $this->ip = $_SERVER['REMOTE_ADDR'];
        }
        return $this->ip;
    }
}