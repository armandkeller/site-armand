<?php

class HomeController
{
    public function httpGetMethod()
    {
        $title = 'armand-dev';
        return [
            'title' => $title,
            'ipModel' => new IpModel(),
        ];
    }

}