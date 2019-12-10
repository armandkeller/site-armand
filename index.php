<?php

// Save the project root directory as a global constant.
define('ROOT_PATH', __DIR__);

/*
 * Create a global constant used to get the filesystem path to the
 * application configuration directory.
 */
define('CFG_PATH', realpath(ROOT_PATH.'/application/config'));

/*
 * Create a global constant used to get the filesystem path to the
 * application public web root directory.
 *
 * Can be used to handle file uploads for example.
 */
define('WWW_PATH', realpath(ROOT_PATH.'/application/www'));


require_once 'application/www/htmlpurifier-4.9.3/library/HTMLPurifier.auto.php';

require_once 'library/Configuration.class.php';
require_once 'library/Database.class.php';
require_once 'library/FlashBag.class.php';
require_once 'library/Form.class.php';
require_once 'library/FrontController.class.php';
require_once 'library/MicroKernel.class.php';
require_once 'library/Http.class.php';
require_once 'library/InterceptingFilter.interface.php';


$config = HTMLPurifier_Config::createDefault();
$config->set('HTML.Allowed', 'p,strong,ol,ul,li,em,a');
$purifier = new HTMLPurifier($config);
$GLOBALS['purifier'] = $purifier;

$microKernel = new MicroKernel();
$microKernel->bootstrap()->run(new FrontController());

$ip = new Ip();
$ipModel = new IpModel();
$visit = 1;
$itsMe = 1;

if (!$ipModel->isNewIp($ip->get_ip())) {
    $ipModel->insertIp($ip->get_ip(), $visit);
} else {
    if (!$ipModel->itsMe($ip->get_ip(), $itsMe)) {
        $ipModel->incrementNumberOfVisit($visit, $ip->get_ip());
    }
}